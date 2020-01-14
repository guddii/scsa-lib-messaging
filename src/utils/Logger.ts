interface ILoggerOptions {
    ctx?: Element | Document | ShadowRoot;
}

export class Logger {
    private container: Element;

    constructor(options: ILoggerOptions = {}) {
        if (options.ctx) {
            this.container = options.ctx.querySelector("[data-logger]");
        } else {
            const body = document.body;
            const container = document.createElement("div");
            container.setAttribute(
                "class",
                "Logger Logger--spaced Logger--stickyBottom"
            );
            this.container = body.appendChild(container);
        }
    }

    public write(data: any) {
        const div = document.createElement("div");
        div.setAttribute("class", "Logger__item Logger__item--truncate");
        data.traveled = new Date().getTime() - data.created;
        div.textContent = "Data: " + JSON.stringify(data);
        this.container.appendChild(div);
    }
}
