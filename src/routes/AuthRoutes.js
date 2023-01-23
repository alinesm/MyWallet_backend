import { signIn, signUp } from "../controller/Auth.js";
import { Router } from "express";
import { validateSchema } from "../middleware/validateSchema.js";
import { userSchema, loginSchema } from "../schema/AuthSchema.js";

const authRouter = Router();

authRouter.post("/cadastro", validateSchema(userSchema), signUp);
authRouter.post("/", validateSchema(loginSchema), signIn);

export default authRouter;
