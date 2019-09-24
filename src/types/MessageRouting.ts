import { EndpointProperties } from "../endpoints/Endpoint";

export interface MessageRouting {
    getRecipients(event: MessageEvent): Array<EndpointProperties>;
}
