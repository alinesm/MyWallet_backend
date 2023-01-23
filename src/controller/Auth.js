import bcrypt from "bcrypt";
import joi from "joi";
import { v4 as uuidV4 } from "uuid";
import db from "../config/database.js";
import { userSchema } from "../schema/AuthSchema.js";

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  const emailExists = await db.collection("users").findOne({ email });

  if (emailExists) return res.status(409).send("Email ja cadastrado!");

  const passwordHashed = bcrypt.hashSync(password, 10);

  try {
    await db
      .collection("users")
      .insertOne({ name, email, password: passwordHashed });
    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });
    console.log(user);

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuidV4();

      await db.collection("sections").insertOne({ token, userId: user._id });
      res.send({ token: token, name: user.name });
    } else {
      res.status(401).send("email ou senha incorretos!");
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
