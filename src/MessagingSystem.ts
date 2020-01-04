import { IMessagingChannel } from "./channels";
import { IMessageRouting } from "./routers";
import { SecurityChecks, Socket } from "./utils";

export enum ChannelKeys {
    DatatypeChannel,
    MessageBus,
    MessagingBridge,
    MessageBroker
}

/**
 * Interface for Messaging System Options
 */
export interface IMessagingSystemOptions {
    channel?: IMessagingChannel;
    endpoints?: Socket[];
    router?: IMessageRouting;
    security?: SecurityChecks;
}

/**
 * Messaging System Class
 */
export class MessagingSystem {
    public options: IMessagingSystemOptions;
    public type: ChannelKeys;

    /**
     * Create a message system
     * @param options
     */
    constructor(options?: IMessagingSystemOptions) {
        this.options = options || {};

        // Set defaults
        this.security();
        this.endpoints();
        this.channel();
        this.router();

        // Export to global scope
        globalThis.MessagingSystem = this;
        return this;
    }

    public get observable() {
        if (this.options.router) {
            return this.options.router;
        }
        return this.options.channel;
    }

    /**
     * Endpoints
     */
    public endpoints(): this {
        this.options.endpoints = this.options.endpoints || Socket.findAll();
        return this;
    }

    /**
     * Security
     */
    protected security(): this {
        return this;
    }

    /**
     * Channel
     */
    protected channel(): this {
        return this;
    }

    /**
     * Router
     */
    protected router(): this {
        return this;
    }
}
