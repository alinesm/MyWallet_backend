import {
  listEntries,
  createEntrie,
  createOutflow,
} from "../controller/MoneyData.js";
import { Router } from "express";

const moneyDataRouter = Router();

moneyDataRouter.get("/home", listEntries);
moneyDataRouter.post("/nova-entrada", createEntrie);
moneyDataRouter.post("/nova-saida", createOutflow);

export default moneyDataRouter;
