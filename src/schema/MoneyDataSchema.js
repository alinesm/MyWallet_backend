import joi from "joi";

export const dataSchema = joi.object({
  description: joi.string().required(),
  value: joi.number().required(),
});
