import { Job } from "bull";

const emailProcessor = async ({ data }: Job<{}>) => {
  try {
    console.log(data);
  } catch (error) {
    throw new Error(error?.toString());
  }
};

export default emailProcessor;
