import { IMessagingSystemOptions } from "../..";
import { IMessagingEndpoints } from "../endpoints";
import { Socket } from "../utils";
import { ChannelAdapter } from "./ChannelAdapter";
import { IChannelAdapter, IMessagingChannel } from "./index";


/**
 * Messaging Bridge.
 *
 * @mermaid Data flow within a Messaging Bridge.
 * graph TB
 *    A[globalThis]--> B[Messaging System]
 *    B --> C{Messaging Bridge}
 *    C --> D[...]
 *    C --> E[...]
 *    C --> F[Channel Adapter]
 *    F --> G[Socket]
 *    G --> H[Event-driven Consumer]
 *    H-->|postMessage|A
 *    H-->|postMessage|B
 *    H-->|subscribe|J[Application]
 *    J-->|publish|H
 */
export class MessagingBridge implements EventListenerObject, IMessagingChannel {
    public options: IMessagingSystemOptions;

    private registry = new Map<string, IChannelAdapter>();
    private subscriber = new Array<IMessagingEndpoints>();

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
     * @param endpoint
     * @param key
     */
    public subscribe(endpoint: IMessagingEndpoints, key?: string) {
        if (this.registry.has(key)) {
            this.registry.get(key).addEventListener(endpoint);
        } else {
            this.subscriber.push(endpoint);
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
                new ChannelAdapter(socket.options.element as HTMLIFrameElement)
            );
        } else {
            throw new Error(socket.options.url + " is a insecure origin");
        }
    };
}
