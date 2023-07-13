import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { emailQueue } from ".";

const serverAdapter = new ExpressAdapter();

createBullBoard({
  queues: [new BullAdapter(emailQueue)],
  serverAdapter,
});

export default serverAdapter;
