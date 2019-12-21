import { IMessageConstruction } from "../constructors";
import { IMessagingEndpoints } from "../endpoints";

export * from "./MessagingBridge";
export * from "./MessageBus";

export interface IChannelAdapter {
  publish(message: IMessageConstruction): void;
  addEventListener(messagingEndpoint: IMessagingEndpoints): void;
  notifyEventListeners(event: MessageEvent): void;
}

export interface IMessagingChannel {
  subscribe(messagingEndpoint: IMessagingEndpoints, key?: string): void;
  publish(message: IMessageConstruction, key?: string): void;
}
