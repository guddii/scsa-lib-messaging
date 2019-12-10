import { MessagingSystem } from "./MessagingSystem";
import { MessagingSystemOptions } from "./MessagingSystemOptions";

export class MessagingSystemFactory {
  /**
   * Create a message system with presets.
   * @param options
   */
  static create(options: MessagingSystemOptions) {
    return new MessagingSystem(options);
  }
}
