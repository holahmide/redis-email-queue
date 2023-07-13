import { emailQueue } from "..";
import { EmailData } from "./types";

export const sendMail = (data: EmailData) => {
  emailQueue.add(data, { attempts: 3 });
};
