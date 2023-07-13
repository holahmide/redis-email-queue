import { Job } from "bull";
import { EmailData } from "./types";
import nodemailer from "nodemailer";

const emailProcessor = async ({ data }: Job<EmailData>) => {
  try {
    const testMailAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testMailAccount.user, // generated ethereal user
        pass: testMailAccount.pass, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const response = await transporter.sendMail(data);

    console.log("Message sent to", data?.to);

    const responseUrl = nodemailer.getTestMessageUrl(response);

    console.log(responseUrl);

    return responseUrl;
  } catch (error) {
    throw new Error(error?.toString());
  }
};

export default emailProcessor;
