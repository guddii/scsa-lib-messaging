import { Config } from "@scsa/global";
import { Message } from "../constructors";
import { EventDrivenConsumer } from "./EventDrivenConsumer";

export class EventDrivenConsumerGT extends EventDrivenConsumer<MessageEvent> {
    /**
     * Initialize an Event-driven Consumer on `globalThis`.
     *
     * This type of an event-driven consumer is supposed to be used within an
     * inline frame. In this particular case, `globalThis` refers to the root
     * of the subsystem.
     */
    constructor(cfg: Config) {
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
