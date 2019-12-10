import { SecurityChecks } from "../..";
import { Message } from "../constructors";

export interface IEventDrivenConsumer {
    callback(data);
}

export class EventDrivenConsumer implements EventListenerObject {

    cfg;
    private securityChecks: SecurityChecks;
    subscriber = [];

    /**
     * Create messaging endpoint
     * @param cfg
     */
    constructor(cfg) {
        this.cfg = cfg;
        this.securityChecks = new SecurityChecks(cfg.endpoints());
        window.addEventListener("message", this, false);
    }

    /**
     * Publish a message to the parent window
     * @param message
     */
    publish(message: Message) {
        parent.postMessage(message, "*");
    }

    /**
     * Subscribe to message events
     * @param element
     */
    subscribe(element: IEventDrivenConsumer) {
        this.subscriber.push(element)
    }

    /**
     * Handle incoming events from parent context
     * @param event
     */
    handleEvent(event: MessageEvent) {
        if (!event.data.body) {
            return;
        }
        if (this.securityChecks.isTrustedURL(event.origin)) {
            this.subscriber.forEach((el) => {
                el.callback(event.data);
            })
        }
    }
}
