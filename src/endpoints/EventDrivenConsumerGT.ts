import { Message } from "../constructors";
import { EventDrivenConsumer } from "./EventDrivenConsumer";

export class EventDrivenConsumerOnGT extends EventDrivenConsumer<MessageEvent> {
    /**
     * Initialize Event-driven Consumer in
     * global scope.
     */
    constructor(cfg) {
        super(cfg);
        globalThis.addEventListener("message", this, false);
    }

    /**
     * Message adapter
     * @param event
     */
    public adapter(event: MessageEvent): Message {
        return event.data;
    }
}
