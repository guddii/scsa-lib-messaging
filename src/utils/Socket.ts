import { ApplicationOptions } from "@scsa/global";

enum SocketProperties {
    selector = "data-endpoint"
}

/**
 * Socket Options
 */
interface SocketOptions extends ApplicationOptions {
    element: Element;
}

export class Socket {
    public options: SocketOptions;

    /**
     * The endpointProperties an endpoint can have.
     * @param options
     */
    constructor(options: SocketOptions) {
        this.options = options
    }

    /**
     * Returns a new instance of a socket.
     * @param endpoint
     */
    static newInstance(endpoint: Element) {
        return new Socket({
            element: endpoint,
            text: endpoint.getAttribute(SocketProperties.selector),
            url: new URL(endpoint.getAttribute("src"))
        });
    }

    /**
     * Find all endpoints within the DOM.
     */
    static findAll(): Array<Socket> {
        const query: string = `[${SocketProperties.selector}]`;
        const elements: NodeListOf<Element> = document.querySelectorAll(query);
        const endpoints: Element[] = Array.from(elements);
        return endpoints.map(endpoint => this.newInstance(endpoint));
    }
}
