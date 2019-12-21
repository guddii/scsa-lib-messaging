import { Message } from "../constructors";
import { EventDrivenConsumer } from "./EventDrivenConsumer";

export class EventDrivenConsumerOnMS extends EventDrivenConsumer<CustomEvent> {
    /**
     * Initialize Event-driven Consumer on
     * a Messaging System instance.
     * @param cfg
     */
    constructor(cfg) {
        super(cfg);
        const selector = `[data-endpoint="${cfg.CURRENT.options.text}"]`;
        const element = document.querySelector(selector);
        element.addEventListener("message", this, false);
    }

    /**
     * Message adapter
     * @param event
     */
    public adapter(event: CustomEvent): Message {
        return event.detail;
    }
}
