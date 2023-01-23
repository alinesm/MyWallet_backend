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

// import express from "express";
// import cors from "cors";
// import dayjs from "dayjs";
// import joi from "joi";
// import { MongoClient, ObjectId } from "mongodb";
// import dotenv from "dotenv";
// import bcrypt from "bcrypt";
// import { v4 as uuidV4 } from "uuid";

// dotenv.config();

// const server = express();
// server.use(cors());
// server.use(express.json());

// const PORT = 5000;
// let db;

// const mongoClient = new MongoClient(process.env.DATABASE_URL);

// try {
//   await mongoClient.connect();
//   db = mongoClient.db();
// } catch (error) {
//   console.log("Deu errro no server");
// }

// // /
// // /cadastro
// // /home
// // /nova-entrada
// // /nova-saida

// server.post("/cadastro", async (req, res) => {
//   //name, email, password
//   const user = req.body;
//   const passwordHash = bcrypt.hashSync(user.password, 10);

//   const usuarioSchema = joi.object({
//     name: joi.string().required(),
//     email: joi.string().email().required(),
//     password: joi.string().required(),
//     // confirmPassword:
//   });

//   const { error } = usuarioSchema.validate(user, { abortEarly: false });

//   if (error) {
//     const errors = error.details.map((detail) => detail.message);
//     return res.status(422).send(errors);
//   }

//   try {
//     await db.collection("users").insertOne({ ...user, password: passwordHash });

//     res.sendStatus(201);
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// });

// server.post("/", async (req, res) => {
//   const { email, password } = req.body;

//   const usuarioSchema = joi.object({
//     email: joi.string().email().required(),
//     password: joi.string().required(),
//   });

//   const { error } = usuarioSchema.validate(
//     { email, password },
//     { abortEarly: false }
//   );

//   if (error) {
//     const errors = error.details.map((detail) => detail.message);
//     return res.status(422).send(errors);
//   }

//   try {
//     const user = await db.collection("users").findOne({ email });

//     if (user && bcrypt.compareSync(password, user.password)) {
//       const token = uuidV4();

//       await db.collection("sections").insertOne({ token, userId: user._id });

//       res.send(token);
//     } else {
//       res.sendStatus(401);
//     }
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// });

// server.get("/home", async (req, res) => {
//   const { authorization } = req.headers;
//   const token = authorization?.replace("Bearer ", "");

//   try {
//     const section = await db.collection("sections").findOne({ token });

//     if (!token || !section) return res.sendStatus(401);

//     const userSection = await db
//       .collection("users")
//       .findOne({ _id: section.userId });

//     delete userSection.password;

//     res.send(userSection);
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// });

// server.listen(PORT, () => {
//   console.log("Servidor funfou de boas!!!");
// });
