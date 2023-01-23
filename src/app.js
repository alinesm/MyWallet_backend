import express from "express";
import cors from "cors";
import authRouter from "./routes/AuthRoutes.js";
import moneyDataRouter from "./routes/MoneyDataRoutes.js";

const server = express();
server.use(express.json());
server.use(cors());

server.use([authRouter, moneyDataRouter]);

server.listen(5000, () => {
  console.log("Servidor funfou de boas!!!");
});
