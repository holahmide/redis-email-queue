import { emailQueue } from "..";
// import { SendMailInQueue } from './types';

const EMAIL_ATTEMPTS = 3;

export const sendMail = (data: any) => {
  console.log("adding queue");

  emailQueue.add(data, { attempts: EMAIL_ATTEMPTS });
};
