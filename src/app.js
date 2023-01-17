import express from "express";
import cors from "cors";
import dayjs from "dayjs";
import joi from "joi";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

const PORT = 5000;
let db;

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
  await mongoClient.connect();
  db = mongoClient.db();
} catch (error) {
  console.log("Deu errro no server");
}

// /
// /cadastro
// /home
// /nova-entrada
// /nova-saida

// server.post("/participants", async (req, res) => {
// });

server.listen(PORT, () => {
  console.log("Servidor funfou de boas!!!");
});
