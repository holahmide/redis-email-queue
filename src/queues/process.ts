import { Job } from "bull";
import { emailQueue } from ".";
import emailProcessor from "./emails/consumer";

const handleFailure = (job: Job, err: Error) => {
  if (job.attemptsMade >= (job?.opts?.attempts || 0)) {
    console.log(
      `Job failures above threshold in ${job.queue.name} for: ${JSON.stringify(
        job.data
      )}`,
      err
    );
    job.remove();
    return null;
  }
  console.log(
    `Job in ${job.queue.name} failed for: ${JSON.stringify(job.data)} with ${
      err.message
    }. ${(job?.opts?.attempts || 0) - job.attemptsMade} attempts left`
  );
};

const handleCompleted = (job: Job) => {
  console.log(
    `Job in ${job.queue.name} completed for: ${JSON.stringify(job.data)}`
  );
  job.remove();
};

const handleStalled = (job: Job) => {
  console.log(
    `Job in ${job.queue.name} stalled for: ${JSON.stringify(job.data)}`
  );
};

export const startQueues = () => {
  console.log("\n Started Running Queues ✅");
  emailQueue.process(emailProcessor);
  emailQueue.on("failed", handleFailure);
  emailQueue.on("completed", handleCompleted);
  emailQueue.on("stalled", handleStalled);
};
