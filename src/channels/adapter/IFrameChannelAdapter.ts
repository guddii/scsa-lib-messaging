import { MessagingEndpoints } from "../../types/MessagingEndpoints";
import { MessageConstruction } from "../../types/MessageConstruction";
import { ChannelAdapter } from "../../types/MessagingChannel";

export class IFrameChannelAdapter implements ChannelAdapter {
    private readonly url: URL;
    private readonly dispatcher: Window;
    private eventListeners = new Array<MessagingEndpoints>();
    private readonly status: Promise<CustomEvent>;
    private readonly element: HTMLIFrameElement;

    /**
     * Create iFrame element for messaging.
     * @param element
     */
    constructor(element: HTMLIFrameElement) {
        this.dispatcher = element.contentWindow;
        this.url = new URL(element.src);
        this.status = this.load(element);
        this.element = element;
    }

    /**
     * Load wait for the iFrame to be loaded.
     * @param element
     */
    async load(element: HTMLIFrameElement): Promise<any> {
        return new Promise(resolve => {
            element.addEventListener("load", resolve, true);
        });
    }

    /**
     * Publish a message to the iFrame dispatcher,
     * when the iFrame is fully loaded
     * @param message
     */
    async publish(message: MessageConstruction) {
        await this.status;
        this.dispatcher.postMessage(message, this.url.origin);
    }

    /**
     * Listen to iframe messaging
     * @param eventListener
     */
    addEventListener(eventListener: MessagingEndpoints) {
        this.eventListeners.push(eventListener);
    }

    /**
     * Notify registered event listener
     * @param event
     */
    notifyEventListeners(event: MessageEvent) {
        for (const listener of this.eventListeners) {
            listener.handleEndpoint(event.data);
        }
    }
}
