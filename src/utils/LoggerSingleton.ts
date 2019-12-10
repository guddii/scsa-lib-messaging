export class LoggerSingleton {
    private static instance: LoggerSingleton;
    private container: HTMLElement;

    private constructor(parent: Document | ShadowRoot) {
        if (parent.querySelector("[data-logger]")) {
            this.container = parent.querySelector("[data-logger]");
        } else {
            const body = document.body;
            const container = document.createElement("div");
            container.setAttribute("class", "Logger Logger--spaced Logger--stickyBottom");
            this.container = body.appendChild(container);
        }
    }

    static getInstance(parent: Document | ShadowRoot = document) {
        if (!LoggerSingleton.instance) {
            LoggerSingleton.instance = new LoggerSingleton(parent);
        }
        return LoggerSingleton.instance;
    }

    write(data: any) {
        const div = document.createElement("div");
        div.setAttribute("class", "Logger__item");
        div.textContent = "Received data: " + JSON.stringify(data);
        this.container.appendChild(div);
    }
}
