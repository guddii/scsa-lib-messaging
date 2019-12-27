import { Config } from "@scsa/global";
import { Message } from "../constructors";
import { ChannelKeys, MessagingSystem } from "../MessagingSystem";
import { EventDrivenConsumer } from "./EventDrivenConsumer";

export class EventDrivenConsumerMS extends EventDrivenConsumer<CustomEvent> {
    private ms: MessagingSystem = globalThis.MessagingSystem;
    /**
     * Initialize an Event-driven Consumer on a [[MessagingSystem]] instance.
     *
     * This type of an event-driven consumer is supposed to be used within
     * endpoints that have direct access to the orchestrator, e.g. an
     * integration as Web Component.
     *
     * @param cfg
     */
    constructor(cfg: Config) {
        super(cfg);

        switch (this.ms.type) {
            case ChannelKeys.MessagingBridge:
                const selector = `[data-endpoint="${cfg.CURRENT.options.text}"]`;
                const listener = document.querySelector(selector);
                listener.addEventListener("message", this, false);
                break;
            case ChannelKeys.MessageBus:
                // @ts-ignore
                this.ms.options.channel.port1.addEventListener(
                    "message",
                    this,
                    false
                );
                break;
            case ChannelKeys.DatatypeChannel:
                break;
            default:
                console.warn("No Messaging System Type identifiable");
                break;
        }
    }

    public publish(message: Message) {
        switch (this.ms.type) {
            case ChannelKeys.MessagingBridge:
                super.publish(message);
                break;
            case ChannelKeys.MessageBus:
                // @ts-ignore
                this.ms.options.channel.port2.postMessage(message);
                break;
            default:
                console.warn("No Messaging System Type identifiable");
                break;
        }
    }

    /**
     * Message adapter
     * @param event
     */
    public adapter(event: CustomEvent): Message {
        switch (this.ms.type) {
            case ChannelKeys.MessagingBridge:
                return event.detail;
            case ChannelKeys.MessageBus:
                // @ts-ignore
                return event.data;
            default:
                console.warn("No Messaging System Type identifiable");
                break;
        }
    }
}
