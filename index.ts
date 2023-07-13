import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { sendMail } from "./queues/emails/producer";
import { startQueues } from "./queues";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

startQueues();

app.get("/", async (req: Request, res: Response) => {
  await sendMail({ me: "here" });
  res.send("Sent Email");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT} ✅`);
});
