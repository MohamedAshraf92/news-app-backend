import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import rootRouter from "./routes/index.js";
import { redisConnect } from "./redis/redisInstance.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4040;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", rootRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

await redisConnect();
