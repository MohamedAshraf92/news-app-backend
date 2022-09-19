import * as dotenv from "dotenv";

import axiosInstance from "./axiosInstance.js";

dotenv.config();
const apiKey = process.env.NEWS_API_KEY;

export const getAllSources = async () => {
  const res = await axiosInstance.get("/top-headlines/sources", {
    params: { apiKey },
  });
  return res.data.sources;
};

export const getSubscribedNews = async (sources) => {
  const res = await axiosInstance.get("/top-headlines", {
    params: { apiKey, sources },
  });
  return res.data;
};
