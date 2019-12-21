import { MessageConstruction } from "./index";

export class Message implements MessageConstruction {
    public body: object;

    /**
     * Create a message
     * @param body
     */
    constructor(body: object) {
        this.body = body;
    }
}
