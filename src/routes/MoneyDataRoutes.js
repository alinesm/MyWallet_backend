import {
  listEntries,
  createEntrie,
  createOutflow,
} from "../controller/MoneyData.js";
import { Router } from "express";

import { authValidation } from "../middleware/AuthMiddleware.js";
import { validateSchema } from "../middleware/validateSchema.js";

import { dataSchema } from "../schema/MoneyDataSchema.js";

const moneyDataRouter = Router();

moneyDataRouter.use(authValidation);
moneyDataRouter.get("/home", listEntries);
moneyDataRouter.post("/nova-entrada", validateSchema(dataSchema), createEntrie);
moneyDataRouter.post("/nova-saida", validateSchema(dataSchema), createOutflow);

export default moneyDataRouter;
