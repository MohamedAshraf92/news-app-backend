import jwt from "jsonwebtoken";

import CustomError from "../helpers/customError.js";

const isAuth = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new CustomError(
        400,
        "Unauthorized",
        "User not authenticated!"
      );
      res.status(400).json(error);
      throw error;
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      const error = new CustomError(
        401,
        "Unauthorized",
        "User not authenticated!"
      );
      res.status(401).json(error);
      throw error;
    }
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    err.statusCode = 500;
    res.status(500).json({ message: err.message });
    throw err;
  }
};

export default isAuth;
