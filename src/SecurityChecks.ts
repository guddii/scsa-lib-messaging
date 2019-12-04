export class SecurityChecks {
    private secureContexts: Array<string>;

    /**
     * Create security checks with a list of
     * secure contexts.
     * @param secureContexts
     */
    constructor(secureContexts: Array<string> = []) {
        this.secureContexts = secureContexts;
    }

    /**
     * Test if a given origin is considered trusted.
     * @param origin
     */
    isTrustedURL(origin: string): boolean {
        console.log(this.secureContexts);
        const host = new URL(origin).host;
        return !!this.secureContexts.find(value => value ===host);
    }
}
