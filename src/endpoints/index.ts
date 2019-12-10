export * from "./EventDrivenConsumer"

export interface MessagingEndpoints {

  /**
   * Handle messages from an endpoint
   * @param message
   */
  handleEndpoint(message: MessageEvent): void;
}
