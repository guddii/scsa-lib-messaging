import { IMessageConstruction } from "./index";

export class Message implements IMessageConstruction {
    public payload: object;

    /**
     * Create a message
     * @param payload
     */
    constructor(payload: object) {
        this.payload = payload;
    }
}
