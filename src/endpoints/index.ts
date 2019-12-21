export * from "./EventDrivenConsumer"
export * from "./EventDrivenConsumerGT"
export * from "./EventDrivenConsumerMS"

export interface IMessagingEndpoints {

  /**
   * Handle messages from an endpoint
   * @param message
   */
  handleEndpoint(message: MessageEvent): void;
}
