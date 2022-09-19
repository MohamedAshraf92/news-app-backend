import Ajv from "ajv";
import addFormats from "ajv-formats";

import CustomError from "./customError.js";

const ajv = new Ajv();
addFormats(ajv);

const validateSchema = (schema, data) => {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    throw new CustomError(400, "BAD_REQUEST", ajv.errors);
  }
};

export default validateSchema;
