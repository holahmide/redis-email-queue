import Bull from "bull";
import dotenv from "dotenv";

dotenv.config();

// DEFINITION OF THE BULL QUEUES
export const emailQueue = new Bull("email", {
  redis: process.env.REDIS_URL,
});
