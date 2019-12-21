import { IMessagingChannel, MessageBus, MessagingBridge } from "./channels";
import { MessageRouting } from "./routers";
import { SecurityChecks, Socket } from "./utils";

export enum ChannelKeys {
    DatatypeChannel,
    MessageBus,
    MessagingBridge
}

/**
 * Interface for Messaging System Options
 */
export interface IMessagingSystemOptions {
    channel?: IMessagingChannel;
    endpoints?: Socket[];
    router?: MessageRouting;
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

        // Export to global scope
        globalThis.MessagingSystem = this;
        return this;
    }

    public security(): this {
        return this;
    }

    public channel(): this {
        return this;
    }

    public endpoints(): this {
        this.options.endpoints = this.options.endpoints || Socket.findAll();
        return this;
    }
}
