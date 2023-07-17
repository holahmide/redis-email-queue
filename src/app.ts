import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { sendMail } from "./queues/emails/producer";
import { startQueues } from "./queues/process";
import serverAdapter from "./queues/adapter";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Express = express();

app.use(express.json());

startQueues();

app.post("/mail", async (req: Request, res: Response) => {
  const { message, ...emailData } = req.body;
  await sendMail({ ...emailData, html: `<p>${message}</p>` });
  res.send("Sent Email");
});

app.use("/admin/queues", serverAdapter.getRouter());

app.listen(PORT, () => {
  console.log(`\n Server is running at http://localhost:${PORT} ✅`);
});
