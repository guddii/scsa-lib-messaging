import { MessagingEndpoints } from "./MessagingEndpoints";
import { MessageConstruction } from "./MessageConstruction";

export interface ChannelAdapter {
    publish(message: MessageConstruction): void;
    addEventListener(messagingEndpoint: MessagingEndpoints): void;
    notifyEventListeners(event: MessageEvent): void;
}

export interface MessagingChannel {
    subscribe(messagingEndpoint: MessagingEndpoints, key?: string): void;
    publish(message: MessageConstruction, key?: string): void;
}
