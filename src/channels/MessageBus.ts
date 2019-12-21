import { IMessageConstruction } from "../constructors";
import { IMessagingEndpoints } from "../endpoints";
import { IMessagingChannel } from "./index";

/**
 * Message Bus.
 */
export class MessageBus extends MessageChannel implements IMessagingChannel {

    constructor() {
        super();
    }

    public publish(message: IMessageConstruction, key?: string): void {}

    public subscribe(endpoint: IMessagingEndpoints, key?: string): void {}
}
