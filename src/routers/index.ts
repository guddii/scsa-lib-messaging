import { IMessageConstruction } from "../constructors";
import { IMessagingEndpoints } from "../endpoints";

export * from "./MessageBroker";

export interface IMessageRouting {
  subscribe(messagingEndpoint: IMessagingEndpoints): void;
  publish(message: IMessageConstruction): void;
}
