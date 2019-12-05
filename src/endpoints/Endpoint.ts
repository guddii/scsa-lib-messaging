import { Application, ApplicationOptions } from "@scsa/global";

enum Selector {
    ENDPOINT = "data-endpoint"
}

interface EndpointOptions extends ApplicationOptions{
    element?: Element;
}

export class EndpointProperties {
    public options;

    /**
     * The endpointProperties an endpoint can have
     * @param options
     */
    constructor(options: EndpointOptions) {
        this.options = options;
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
                new EndpointProperties({
                    text: endpoint.getAttribute(Selector.ENDPOINT),
                    url: new URL(endpoint.getAttribute("src")),
                    element: endpoint
                })
        );
    }
}
