import joi from "joi";

export const dataSchema = joi.object({
  description: joi.string().required(),
  value: joi.number().required(),
  // type: joi.string().valid("entry", "outflow").required(),
  // date: dayjs().format('DD/MM/YYYY'),
});
