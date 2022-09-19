import Ajv from "ajv";
import addFormats from "ajv-formats";

import User from "../models/user.js";
import { getAllSources, getSubscribedNews } from "../APIs/news.js";
import CustomError from "../helpers/customError.js";
import validateSchema from "../helpers/validateSchema.js";
import { subscribtionBodySchema } from "../schemas/newsSchemas.js";

const ajv = new Ajv();
addFormats(ajv);

export const allSources = async (req, res, next) => {
  try {
    const { subscribedSources } = await User.findById(req.userId);
    const fitchedSources = await getAllSources();
    const mappedSources = fitchedSources.map((source) => {
      return { ...source, isSubscribed: subscribedSources.includes(source.id) };
    });
    await Promise.all(mappedSources);
    res.status(200).json(mappedSources);
  } catch (error) {
    res.status(error.status).json(error);
  }
};

export const subscribeToSource = async (req, res, next) => {
  const { userId } = req;
  const { sourceId } = req.body;

  try {
    validateSchema(subscribtionBodySchema, req.body);

    const { subscribedSources } = await User.findById(userId);

    if (subscribedSources.includes(sourceId)) {
      throw new CustomError(
        400,
        "UNPROCESSABLE",
        `You already subscribed to ${sourceId}`
      );
    }

    const updatedSubscribedSources = subscribedSources.concat(sourceId);
    await User.updateOne(
      { _id: userId },
      { subscribedSources: updatedSubscribedSources }
    );
    res.status(201).json({ message: `Subscribed successfully to ${sourceId}` });
  } catch (error) {
    res.status(error.status).json(error);
  }
};

export const unsubscribeToSource = async (req, res, next) => {
  const { userId } = req;
  const { sourceId } = req.body;

  try {
    validateSchema(subscribtionBodySchema, req.body);

    const { subscribedSources } = await User.findById(userId);

    if (!subscribedSources.includes(sourceId)) {
      throw new CustomError(
        400,
        "UNPROCESSABLE",
        `You don\'t subscribe ${sourceId}`
      );
    }

    const filteredSources = subscribedSources.filter((el) => el !== sourceId);
    await User.updateOne(
      { _id: userId },
      { subscribedSources: filteredSources }
    );
    res
      .status(201)
      .json({ message: `Unsubscribed successfully to ${sourceId}` });
  } catch (error) {
    res.status(error.status).json(error);
  }
};

export const getSubscribedHeadlines = async (req, res, next) => {
  const { userId } = req;
  try {
    const { subscribedSources } = await User.findById(userId);
    if (subscribedSources.length === 0) {
      throw new CustomError(
        400,
        "UNPROCESSABLE",
        `You don\'t subscribe to any source yet!`
      );
    }
    const sources = subscribedSources.toString();
    const subscribedHeadlines = await getSubscribedNews(sources);
    res.status(200).json(subscribedHeadlines);
  } catch (error) {
    res.status(error.status).json(error);
  }
};
