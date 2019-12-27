import { IMessageConstruction } from "../constructors";
import { IMessagingEndpoints } from "../endpoints";
import { IMessagingChannel } from "./index";

/**
 * Message Bus.
 */
export class MessageBus extends MessageChannel
    implements EventListenerObject, IMessagingChannel {
    private subscriber = new Array<IMessagingEndpoints>();

    constructor() {
        super();
        this.port1.addEventListener("message", this);
        this.port1.start();
    }

    public publish(message: IMessageConstruction, key?: string): void {
        this.port2.postMessage(message);
    }

    public subscribe(endpoint: IMessagingEndpoints, key?: string): void {
        this.subscriber.push(endpoint);
    }

    public handleEvent(event: MessageEvent): void {
        this.subscriber.forEach(entry => {
            entry.handleEndpoint(event.data);
        });
    }
}
