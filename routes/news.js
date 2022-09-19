import { Router } from "express";

import {
  allSources,
  getSubscribedHeadlines,
  subscribeToSource,
  unsubscribeToSource,
} from "../controllers/news.js";
import isAuth from "../middlewares/isAuth.js";

const router = Router();

router.get("/allSources", isAuth, allSources);

router.post("/subscribe", isAuth, subscribeToSource);

router.post("/unsubscribe", isAuth, unsubscribeToSource);

router.get("/subscribedNews", isAuth, getSubscribedHeadlines);

export default router;
