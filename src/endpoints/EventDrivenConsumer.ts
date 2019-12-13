import { SecurityChecks } from "../..";
import { Message } from "../constructors";

export interface IEventDrivenConsumer {
    callback(data);
}

export class EventDrivenConsumer implements EventListenerObject {
    cfg;
    ctx = parent;
    private securityChecks: SecurityChecks;
    subscriber = [];

    /**
     * Create messaging endpoint
     * @param cfg
     */
    constructor(cfg) {
        this.cfg = cfg;
        this.securityChecks = new SecurityChecks(cfg.endpoints());
        if (globalThis.MessagingSystem) {
            const selector = `[data-endpoint="${cfg.CURRENT.options.text}"]`;
            document
                .querySelector(selector)
                .addEventListener("message", this, false);
            console.log(`EventDrivenConsumer is listening to ${selector}`);
        } else {
            window.addEventListener("message", this, false);
            console.log(`EventDrivenConsumer is listening to window`);
        }
    }

    /**
     * Publish a message to the parent window
     * @param message
     */
    publish(message: Message) {
        this.ctx.postMessage(message, "*");
    }

    /**
     * Subscribe to message events
     * @param element
     */
    subscribe(element: IEventDrivenConsumer) {
        this.subscriber.push(element);
    }

    /**
     * Handle incoming events from parent context
     * @param event
     */
    handleEvent(event: MessageEvent) {
        let data;
        // @ts-ignore
        if (event.detail) {
            // @ts-ignore
            data = event.detail;
        } else {
            data = event.data;
        }

        this.subscriber.forEach(el => {
            // @ts-ignore
            el.callback(data);
        });
    }
}
