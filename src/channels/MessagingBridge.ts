import { MessagingEndpoints } from "../types/MessagingEndpoints";
import { SecurityChecks } from "../SecurityChecks";
import { ChannelAdapter, MessagingChannel } from "../types/MessagingChannel";
import { ChannelAdapterFactory } from "./adapter/ChannelAdapterFactory";
import { MessageRouting } from "../types/MessageRouting";
import { EndpointProperties } from "../endpoints/Endpoint";

export class MessagingBridge implements EventListenerObject, MessagingChannel {
    private registry = new Map<string, ChannelAdapter>();
    private readonly securityChecks: SecurityChecks;
    private readonly router: MessageRouting;
    private readonly channelAdapterType: string;

    /**
     * Create a Message Bridge
     * @param router
     * @param endpoints
     * @param securityChecks
     * @param channelAdapterType
     */
    constructor(
        router: MessageRouting,
        endpoints: Array<EndpointProperties>,
        securityChecks: SecurityChecks = new SecurityChecks(),
        channelAdapterType = "iframe"
    ) {
        window.addEventListener("message", this);
        this.securityChecks = securityChecks;
        this.router = router;
        this.channelAdapterType = channelAdapterType;
        endpoints.forEach(this.register);
    }

    /**
     * Register an element
     * @param endpointProperties
     */
    private register = (endpointProperties: EndpointProperties) => {
        if (this.securityChecks.isTrustedURL(endpointProperties.url.href)) {
            this.registry.set(
                endpointProperties.name,
                ChannelAdapterFactory.create(
                    this.channelAdapterType,
                    endpointProperties.element
                )
            );
        } else {
            throw new Error(endpointProperties.url + " is a insecure origin");
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
            throw new Error(key + " does not exist in registry");
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
        const subscribers = this.router.getRecipients(event);
        subscribers.forEach(subscriber => {
            if (subscriber) {
                if (this.registry.has(subscriber.name)) {
                    this.registry
                        .get(subscriber.name)
                        .notifyEventListeners(event);
                    this.registry
                        .get(subscriber.name)
                        .publish(event.data);
                } else {
                    throw new Error(subscriber + " does not exist in registry");
                }
            }
        });
    };
}
