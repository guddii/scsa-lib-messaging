import { Config } from "@scsa/global";
import { SecurityChecks } from "../..";
import { Message } from "../constructors";

export interface IEventDrivenConsumer {
    callback(data);
}

export abstract class EventDrivenConsumer<T extends Event>
    implements EventListenerObject {
    public cfg: Config;
    public ctx: Window = parent;
    public subscriber = [];

    public listener: any;
    private securityChecks: SecurityChecks;

    /**
     * Create messaging endpoint
     * @param cfg
     */
    protected constructor(cfg: Config) {
        this.cfg = cfg;
        this.securityChecks = new SecurityChecks(cfg.endpoints());
    }

    /**
     * Publish a message to the parent window
     * @param message
     */
    public publish(message: Message) {
        if ("postMessage" in this.ctx) {
            this.ctx.postMessage(message, "*");
        } else {
            throw Error("postMessage is not available");
        }
    }

    /**
     * Message event
     * @param event
     */
    public adapter(event: T): Message {
        throw Error("No event adapter specified!");
    }

    /**
     * Handle incoming events from parent context
     * @param event
     */
    public handleEvent(event) {
        const data = this.adapter(event);
        this.subscriber.forEach(el => {
            el.callback(data);
        });
    }
    /**
     * Subscribe to message events
     * @param element
     */
    public subscribe(element: IEventDrivenConsumer) {
        this.subscriber.push(element);
    }
}
