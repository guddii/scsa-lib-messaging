import { IMessageConstruction } from "../constructors";
import { IMessagingEndpoints } from "../endpoints";
import { IMessageRouting } from "./index";

export class MessageBroker implements EventListenerObject, IMessageRouting {
    private subscriber = new Array<IMessagingEndpoints>();

    constructor() {
        if (navigator.serviceWorker) {
            navigator.serviceWorker.register("/service-worker.js");
            navigator.serviceWorker.addEventListener("message", this, false);
        }
    }

    public publish(message: IMessageConstruction): void {
        navigator.serviceWorker.controller.postMessage(message);
    }

    public subscribe(endpoint: IMessagingEndpoints): void {
        this.subscriber.push(endpoint);
    }

    public handleEvent(event: MessageEvent): void {
        this.subscriber.forEach(entry => {
            entry.handleEndpoint(event.data);
        });
    }
}
