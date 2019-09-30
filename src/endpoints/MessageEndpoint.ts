import { SecurityChecks } from "../SecurityChecks";
import { Message } from "../constructors/Message";
import { EndpointProperties } from "./Endpoint";
import { LoggerSingleton } from "../LoggerSingleton";

export class MessageEndpoint implements EventListenerObject {
    endpointProperties: EndpointProperties;
    mainProperties: EndpointProperties;
    securityChecks: SecurityChecks;

    /**
     * Create messaging endpoint
     * @param endpointProperties
     * @param mainProperties
     * @param securityChecks
     */
    constructor(
        endpointProperties: EndpointProperties,
        mainProperties: EndpointProperties,
        securityChecks: SecurityChecks = new SecurityChecks()
    ) {
        this.endpointProperties = endpointProperties;
        this.mainProperties = mainProperties;
        this.securityChecks = securityChecks;
        window.addEventListener("message", this, false);
    }

    /**
     * Publish a message to the parent window
     * @param message
     */
    publish(message: Message) {
        parent.postMessage(message, this.mainProperties.url.origin);
    }

    /**
     * Subscribe to message events
     * @param event
     */
    subscribe(event: MessageEvent) {
        try {
            const instance = LoggerSingleton.getInstance();
            instance.write(event.data);
        } catch (error) {
            console.warn(error);
        }
    }

    /**
     * Handle incoming events from parent context
     * @param event
     */
    handleEvent(event: MessageEvent) {
        if (!event.data.body) {
            return;
        }
        if (this.securityChecks.isTrustedURL(event.origin)) {
            this.subscribe(event);
        }
    }
}
