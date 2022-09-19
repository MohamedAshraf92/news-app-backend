import User from "../models/user.js";
import validateSchema from "../helpers/validateSchema.js";
import { loginBodySchema, signupBodySchema } from "../schemas/userSchemas.js";
import {
  authinticateUser,
  generateJWT,
  isUserExist,
} from "../helpers/userHelpers.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    validateSchema(loginBodySchema, req.body);
    const currentUser = await authinticateUser(email, password);
    const token = generateJWT(email, currentUser._id);
    const sentUser = {
      id: currentUser._id,
      email: currentUser.email,
      fullName: currentUser.fullName,
      subscribedSources: currentUser.subscribedSources,
    };
    res.status(200).json({ token, user: sentUser });
  } catch (error) {
    res.status(error.status).json(error);
  }
};

export const addUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    validateSchema(signupBodySchema, req.body);
    await isUserExist(email);
    const createdUser = await User.create(req.body);
    res.status(201).json({ message: "User created!", userId: createdUser._id });
  } catch (error) {
    res.status(error.status).json(error);
  }
};
