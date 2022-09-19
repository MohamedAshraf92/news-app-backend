export const subscribtionBodySchema = {
  type: "object",
  properties: {
    sourceId: { type: "string" },
  },
  required: ["sourceId"],
  additionalProperties: false,
};
