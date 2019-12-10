import { MessagingEndpoints } from "../endpoints";
import { MessagingSystemOptions } from "../..";
import { ChannelAdapter, MessagingChannel } from "./index";
import { ChannelAdapterFactory } from "./adapter/ChannelAdapterFactory";
import { Socket } from "../utils";

export class MessagingBridge implements EventListenerObject, MessagingChannel {
    private registry = new Map<string, ChannelAdapter>();
    private subscriber = new Array<MessagingEndpoints>();
    public options: MessagingSystemOptions;

    /**
     * Create a Message Bridge
     * @param options
     */
    constructor(options: MessagingSystemOptions) {
        this.options = options;
        window.addEventListener("message", this);
        options.endpoints.forEach(this.register);
    }

    /**
     * Register an element
     * @param socket
     */
    private register = (socket: Socket) => {
        if (this.options.security.isTrustedSocket(socket)) {
            this.registry.set(
                socket.options.text,
                ChannelAdapterFactory.create("iframe", socket.options.element)
            );
        } else {
            throw new Error(socket.options.url + " is a insecure origin");
        }
    };

    /**
     * Subscribe to a endpoint from the registry
     * @param messagingEndpoint
     * @param key
     */
    subscribe(messagingEndpoint: MessagingEndpoints, key?: string) {
        if (this.registry.has(key)) {
            this.registry.get(key).addEventListener(messagingEndpoint);
        } else {
            this.subscriber.push(messagingEndpoint);
        }
    }

    /**
     * Publish to a endpoint from the registry
     * @param message
     * @param key
     */
    publish(message: any, key?: string) {
        if (this.registry.has(key)) {
            return this.registry.get(key).publish(message);
        } else {
            throw new Error(key + " does not exist in registry");
        }
    }

    /**
     * Handle a event from an Endpoint
     * @param event
     */
    handleEvent = (event: MessageEvent) => {
        this.subscriber.forEach(entry => {
            entry.handleEndpoint(event.data);
        });
        this.registry.forEach(entry => {
            entry.notifyEventListeners(event);
            entry.publish(event.data);
        });
    };
}
