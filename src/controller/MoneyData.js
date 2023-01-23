import { dataSchema } from "../schema/MoneyDataSchema.js";
import db from "../config/database.js";
import dayjs from "dayjs";

export async function listEntries(req, res) {
  const checkSession = res.locals.session;
  try {
    const data = await db
      .collection("data")
      .find({ userId: checkSession.userId })
      .toArray();

    return res.send(data);
  } catch (error) {
    res.status(500).send("Deu zica no servidor de banco de dados");
  }
}

export async function createEntrie(req, res) {
  const data = req.body;
  const checkSession = res.locals.session;
  try {
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
  const checkSession = res.locals.session;

  try {
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
