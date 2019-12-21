import { MessageConstruction } from "../constructors";
import { MessagingEndpoints } from "../endpoints";

export * from "./MessagingBridge";

export interface IChannelAdapter {
  publish(message: MessageConstruction): void;
  addEventListener(messagingEndpoint: MessagingEndpoints): void;
  notifyEventListeners(event: MessageEvent): void;
}

export interface IMessagingChannel {
  subscribe(messagingEndpoint: MessagingEndpoints, key?: string): void;
  publish(message: MessageConstruction, key?: string): void;
}
