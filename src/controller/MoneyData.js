import { dataSchema } from "../Model/MoneyDataSchema.js";
import db from "../config/database.js";
import dayjs from "dayjs";

// {"description": "restaurante2", "value": 20.30, "type": "entry"}

export async function listEntries(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  try {
    const checkSession = await db.collection("sections").findOne({ token });

    if (!token || !checkSession)
      return res
        .status(401)
        .send("Você não tem autorização para realizar os cadastros");

    const data = await db
      .collection("data")
      .find({ userId: checkSession.userId })
      .toArray();

    // console.log(data);

    return res.send(data);
  } catch (error) {
    res.status(500).send("Deu zica no servidor de banco de dados");
  }
}

export async function createEntrie(req, res) {
  const data = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(422).send("Informe o token!");

  const { error } = dataSchema.validate(data, { abortEarly: false });

  if (error) {
    const erros = error.details.map((err) => {
      return err.message;
    });
    return res.status(422).send(erros);
  }

  try {
    const checkSession = await db.collection("sections").findOne({ token });

    if (!checkSession)
      return res
        .status(401)
        .send("Você não tem autorização para realizar os cadastros");

    const dataUserLogged = await db
      .collection("data")
      .find({ userId: checkSession.userId })
      .toArray();

    const dataExist = dataUserLogged.some(
      (item) => item.description === data.description
    );
    console.log(dataExist);

    if (dataExist)
      return res.status(409).send("Essa descriçào ja foi adicionada!");

    await db.collection("data").insertOne({
      description: data.description,
      value: data.value,
      type: "entry",
      date: dayjs().format("DD/MM/YYYY"),
      userId: checkSession.userId,
    });
    res.send("ok");
  } catch (err) {
    console.log(err);
    res.status(500).send("Deu algo errado no servidor");
  }
}

export async function createOutflow(req, res) {
  const data = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(422).send("Informe o token!");

  const { error } = dataSchema.validate(data, { abortEarly: false });

  if (error) {
    const erros = error.details.map((err) => {
      return err.message;
    });
    return res.status(422).send(erros);
  }

  try {
    const checkSession = await db.collection("sections").findOne({ token });

    if (!checkSession)
      return res
        .status(401)
        .send("Você não tem autorização para cadastrar uma receita");

    const dataUserLogged = await db
      .collection("data")
      .find({ userId: checkSession.userId })
      .toArray();

    const dataExist = dataUserLogged.some(
      (item) => item.description === data.description
    );
    console.log(dataExist);

    if (dataExist)
      return res.status(409).send("Essa descrição ja foi adicionada!");

    const dataSent = await db.collection("data").insertOne({
      description: data.description,
      value: data.value,
      type: "outflow",
      date: dayjs().format("DD/MM/YYYY"),
      userId: checkSession.userId,
    });
    console.log(dataSent);
    res.send("ok");
  } catch (err) {
    console.log(err);
    res.status(500).send("Deu algo errado no servidor");
  }
}
