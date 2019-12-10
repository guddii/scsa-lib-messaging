import { Socket } from "./Socket";

export class SecurityChecks {
    private secureContexts: Array<string>;

    /**
     * Create security checks with a list of
     * secure contexts.
     * @param secureContexts
     */
    constructor(secureContexts: object = {}) {
        this.secureContexts = Object.values(secureContexts).map(
            (a: any) => a.options.url.host
        );
    }

    /**
     * Test if a given origin is considered trusted.
     * @param origin
     */
    isTrustedURL(origin: string): boolean {
        const host = new URL(origin).host;
        return !!this.secureContexts.find(value => value === host);
    }

    /**
     * Test if a given origin is considered trusted.
     * @param socket
     */
    isTrustedSocket(socket: Socket): boolean {
        const host = socket.options.url.host;
        return !!this.secureContexts.find(value => value === host);
    }
}
