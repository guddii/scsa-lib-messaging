import { EndpointProperties } from "../endpoints/Endpoint";

export interface MessagingEndpoints {
    properties: EndpointProperties;

    /**
     * Handle messages from an endpoint
     * @param message
     */
    handleEndpoint(message: MessageEvent): void;
}
