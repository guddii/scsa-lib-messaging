import { IMessageConstruction } from "./index";

export class Message implements IMessageConstruction {
    public payload: object;
    private created: number;

    /**
     * Create a message
     * @param payload
     */
    constructor(payload: object) {
        this.payload = payload;
        this.created = new Date().getTime()
    }
}
