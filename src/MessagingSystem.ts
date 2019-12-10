import { MessagingBridge } from "./channels";
import { Socket } from "./utils";
import { MessagingSystemOptions } from "./MessagingSystemOptions";

export class MessagingSystem {
    public options: MessagingSystemOptions;

    /**
     * Create a message system
     * @param options
     */
    constructor(options: MessagingSystemOptions) {
        this.options = options;
        this.endpoints();
        this.channel();
        this.router();
        this.translator();
        return this;
    }

    endpoints() {
        this.options.endpoints = this.options.endpoints || Socket.findAll();
        return this;
    }

    channel() {
        this.options.channel =
            this.options.channel || new MessagingBridge(this.options);
        return this;
    }

    router() {
        this.options.router = this.options.router || null;
        return this;
    }

    translator() {
        return this;
    }
}
