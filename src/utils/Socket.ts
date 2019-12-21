import { IApplicationOptions } from "@scsa/global";

enum SocketProperties {
    selector = "data-endpoint"
}

/**
 * Socket Options
 */
interface ISocketOptions extends IApplicationOptions {
    element: Element;
}

export class Socket {
    /**
     * Returns a new instance of a socket.
     * @param endpoint
     */
    public static newInstance(endpoint: Element) {
        return new Socket({
            element: endpoint,
            text: endpoint.getAttribute(SocketProperties.selector),
            url: new URL(endpoint.getAttribute("src"))
        });
    }

    /**
     * Find all endpoints within the DOM.
     */
    public static findAll(): Socket[] {
        const query: string = `[${SocketProperties.selector}]`;
        const elements: NodeListOf<Element> = document.querySelectorAll(query);
        const endpoints: Element[] = Array.from(elements);
        return endpoints.map(endpoint => this.newInstance(endpoint));
    }

    /**
     * Socket Options
     */
    public options: ISocketOptions;

    /**
     * The endpointProperties an endpoint can have.
     * @param options
     */
    constructor(options: ISocketOptions) {
        this.options = options;
    }
}
