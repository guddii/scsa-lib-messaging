import { MessageConstruction } from "./index";

export class Message implements MessageConstruction {
    body: object;

    /**
     * Create a message
     * @param body
     */
    constructor(body: object) {
        this.body = body;
    }
}
