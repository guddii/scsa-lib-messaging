enum Selector {
    ENDPOINT = "data-endpoint"
}

export class EndpointProperties {
    name: string;
    element: Element;
    url: URL;

    /**
     * The endpointProperties an endpoint can have
     * @param name
     * @param src
     * @param element
     */
    constructor(name: string, src?: string, element?: Element) {
        this.name = name;
        if (src) {
            this.url = new URL(src);
        }
        if (element) {
            this.element = element;
        }
    }
}

export class Endpoint {
    /**
     * Find all endpoints within the DOM
     */
    static findAll(): Array<EndpointProperties> {
        const endpoints = Array.from(
            document.querySelectorAll(`[${Selector.ENDPOINT}]`)
        );
        return endpoints.map(
            endpoint =>
                new EndpointProperties(
                    endpoint.getAttribute(Selector.ENDPOINT),
                    endpoint.getAttribute("src"),
                    endpoint
                )
        );
    }
}
