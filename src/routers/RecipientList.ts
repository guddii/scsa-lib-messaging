import { MessageRouting } from "../types";
import { Endpoint, EndpointProperties } from "../endpoints";

export class RecipientList implements MessageRouting {
    private readonly recipients = new Map<string, Array<EndpointProperties>>();
    private readonly endpoints: Array<EndpointProperties>;

    /**
     * Create a this router
     * @param recipientsMap
     * @param endpoints
     */
    constructor(
        recipientsMap: Map<string, Array<EndpointProperties>>,
        endpoints: Array<EndpointProperties>
    ) {
        this.recipients = recipientsMap;
        this.endpoints = endpoints;
    }

    /**
     * Find a publisher by the origin of the event.
     * @param host
     */
    findByHost(host: string) {
        return this.endpoints.find(endpoint => endpoint.options.url.host === host);
    }

    /**
     * Returns a list of endpoints that shall receive a certain message
     * @param event
     */
    getRecipients(event: MessageEvent): Array<EndpointProperties> {
        const publisher = this.findByHost(new URL(event.origin).host);
        if (publisher && this.recipients.has(publisher.options.text)) {
            return this.recipients.get(publisher.options.text);
        }
        return [];
    }
}
