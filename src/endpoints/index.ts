export * from "./EventDrivenConsumer"
export * from "./EventDrivenConsumerOnGT"
export * from "./EventDrivenConsumerOnMS"

export interface MessagingEndpoints {

  /**
   * Handle messages from an endpoint
   * @param message
   */
  handleEndpoint(message: MessageEvent): void;
}
