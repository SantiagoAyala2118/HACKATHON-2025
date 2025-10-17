import { Router } from "express";
//* CONTROLADORES
import { login, logout, register } from "../controllers/auth.controllers.js";

//* MIDDLEWARES
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  registerValidations,
  loginValidations,
} from "../middlewares/validations/auth.validations.js";
import { validator } from "../middlewares/validator.js";

export const authRouter = Router();

authRouter.post("/auth/register", registerValidations, validator, register);
authRouter.post("/auth/login", loginValidations, validator, login);
authRouter.post("/auth/logout", authMiddleware, logout);
