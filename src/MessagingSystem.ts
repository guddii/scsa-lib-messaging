import { MessagingBridge } from "./channels/MessagingBridge";
import { RecipientList } from "./routers/RecipientList";
import { Endpoint, EndpointProperties } from "./endpoints/Endpoint";
import { MessageRouting } from "./types/MessageRouting";
import { MessagingChannel } from "./types/MessagingChannel";
import { SecurityChecks } from "./SecurityChecks";

export class MessagingSystem {
    endpoints: Array<EndpointProperties>;
    channel: MessagingChannel;
    router: MessageRouting;

    /**
     * Create a message system
     * @param recipients
     * @param securityChecks
     */
    constructor(
        recipients: Map<string, Array<EndpointProperties>>,
        securityChecks: SecurityChecks = new SecurityChecks()
    ) {
        this.endpoints = Endpoint.findAll();
        this.router = new RecipientList(recipients, this.endpoints);
        this.channel = new MessagingBridge(
            this.router,
            this.endpoints,
            securityChecks
        );
    }
}

export class MessagingSystemFactory {
    /**
     * Create a message system with presets.
     * @param recipients
     * @param securityChecks
     * @param type
     */
    static create(
        recipients: Map<string, Array<EndpointProperties>>,
        securityChecks: SecurityChecks = new SecurityChecks(),
        type = "iFrameBridge"
    ) {
        if (type === "iFrameBridge") {
            return new MessagingSystem(recipients, securityChecks);
        }
    }
}
