import { IMessagingSystemOptions } from "../..";
import { MessagingEndpoints } from "../endpoints";
import { Socket } from "../utils";
import { ChannelAdapterFactory } from "./adapter/ChannelAdapterFactory";
import { IChannelAdapter, IMessagingChannel } from "./index";

export class MessagingBridge implements EventListenerObject, IMessagingChannel {
    public options: IMessagingSystemOptions;

    private registry = new Map<string, IChannelAdapter>();
    private subscriber = new Array<MessagingEndpoints>();

    /**
     * Create a Message Bridge
     * @param options
     */
    constructor(options: IMessagingSystemOptions) {
        this.options = options;

        window.addEventListener("message", this);
        options.endpoints.forEach(this.register);
    }

    /**
     * Subscribe to a endpoint from the registry
     * @param messagingEndpoint
     * @param key
     */
    public subscribe(messagingEndpoint: MessagingEndpoints, key?: string) {
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
    public publish(message: any, key?: string) {
        if (this.registry.has(key)) {
            return this.registry.get(key).publish(message);
        } else {
            this.registry.forEach(entry => {
                entry.publish(message);
            });
        }
    }

    /**
     * Handle a event from an Endpoint
     * @param event
     */
    public handleEvent = (event: MessageEvent) => {
        this.subscriber.forEach(entry => {
            entry.handleEndpoint(event.data);
        });
        this.registry.forEach(entry => {
            entry.notifyEventListeners(event);
            entry.publish(event.data);
        });
    };

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
}
