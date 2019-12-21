import { IChannelAdapter } from ".";
import { IMessageConstruction } from "../constructors";
import { IMessagingEndpoints } from "../endpoints";

export class ChannelAdapter implements IChannelAdapter {
    private readonly url: URL;
    private readonly dispatcher: Window | HTMLElement;
    private eventListeners = new Array<IMessagingEndpoints>();
    private readonly status: Promise<CustomEvent>;
    private readonly element: HTMLIFrameElement;

    /**
     * Create iFrame element for messaging.
     * @param element
     */
    constructor(element: HTMLIFrameElement) {
        this.url = new URL(element.getAttribute("src"));
        this.status = this.load(element);
        this.element = element;
        this.dispatcher = element.contentWindow || element;
    }

    /**
     * Load wait for the iFrame to be loaded.
     * @param element
     */
    public async load(element: HTMLIFrameElement): Promise<any> {
        return new Promise(resolve => {
            element.addEventListener("load", resolve, true);
        });
    }

    /**
     * Publish a message to the iFrame dispatcher,
     * when the iFrame is fully loaded
     * @param message
     */
    public async publish(message: IMessageConstruction) {
        if ("postMessage" in this.dispatcher) {
            await this.status;
            this.dispatcher.postMessage(message, this.url.origin);
        } else {
            const event = new CustomEvent("message", {
                detail: message
            });
            this.dispatcher.dispatchEvent(event);
        }
    }

    /**
     * Listen to iframe messaging
     * @param eventListener
     */
    public addEventListener(eventListener: IMessagingEndpoints) {
        this.eventListeners.push(eventListener);
    }

    /**
     * Notify registered event listener
     * @param event
     */
    public notifyEventListeners(event: MessageEvent) {
        for (const listener of this.eventListeners) {
            listener.handleEndpoint(event.data);
        }
    }
}
