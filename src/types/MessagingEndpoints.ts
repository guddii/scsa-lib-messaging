import { EndpointProperties } from "../endpoints";

export interface MessagingEndpoints {
    properties: EndpointProperties;

    /**
     * Handle messages from an endpoint
     * @param message
     */
    handleEndpoint(message: MessageEvent): void;
}
