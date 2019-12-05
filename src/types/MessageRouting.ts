import { EndpointProperties } from "../endpoints";

export interface MessageRouting {
    getRecipients(event: MessageEvent): Array<EndpointProperties>;
}
