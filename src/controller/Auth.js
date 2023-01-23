import bcrypt from "bcrypt";
import joi from "joi";
import { v4 as uuidV4 } from "uuid";
import db from "../config/database.js";
import { userSchema } from "../Model/AuthSchema.js";

// {"name": "aline2", "email": "aline2@gmail.com", "password": "123456", "confirmPassword": "123456" }
// {"email": "aline2@gmail.com", "password": "123456"}

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  const emailExists = await db.collection("users").findOne({ email });

  if (emailExists) return res.status(409).send("Email ja cadastrado!");

  const { error } = userSchema.validate({
    name,
    email,
    password,
    confirmPassword,
  });

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(422).send(errorMessages);
  }

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

  const usuarioSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const { error } = usuarioSchema.validate(
    { email, password },
    { abortEarly: false }
  );

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

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
