import { Router } from "express";

import userRoutes from "./user.js";
import newsRouter from "./news.js";

const rootRouter = Router();

rootRouter.use("/user", userRoutes);
rootRouter.use("/news", newsRouter);

export default rootRouter;
