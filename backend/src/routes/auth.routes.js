import { Router } from "express";
//* CONTROLADORES
import { login, logout, register } from "../controllers/auth.controllers.js";

//* MIDDLEWARES
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  registerValidations,
  loginValidations,
} from "../middlewares/validations/auth.validations.js";

const authRouter = Router();

authRouter.post("/register", registerValidations, register);
authRouter.post("/login", loginValidations, login);
authRouter.post("/logout", authMiddleware, logout);

export default authRouter;
