export const signupBodySchema = {
  type: "object",
  properties: {
    fullName: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 8 },
  },
  required: ["fullName", "email", "password"],
  additionalProperties: false,
};

export const loginBodySchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 8 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};
