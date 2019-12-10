import { SecurityChecks, Socket } from "./utils";
import { MessageRouting } from "./routers";
import { MessagingChannel } from "./channels";

/**
 * Messaging System
 */
export interface MessagingSystemOptions {
  endpoints?: Array<Socket>;
  router?: MessageRouting;
  channel?: MessagingChannel;
  security?: SecurityChecks;
}
