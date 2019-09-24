import { IFrameChannelAdapter } from "./IFrameChannelAdapter";
import { ChannelAdapter } from "../../types/MessagingChannel";

export class ChannelAdapterFactory {
    /**
     * Create a channel adapter
     * @param type
     * @param element
     */
    static create(type = "iframe", element: Element): ChannelAdapter {
        if (type === "iframe") {
            return new IFrameChannelAdapter(element as HTMLIFrameElement);
        }
    }
}
