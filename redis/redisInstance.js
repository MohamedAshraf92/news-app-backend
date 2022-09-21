import { createClient } from "redis";

const redisClient = createClient();

export const redisConnect = async () => {
  redisClient.on("error", (error) => console.error(error));
  await redisClient.connect();
  console.log("Connected to Redis");
};

export default redisClient;
