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

const authRouter = Router();

authRouter.post("/register", registerValidations, validator, register);
authRouter.post("/login", loginValidations, validator, login);
authRouter.post("/logout", authMiddleware, logout);

export default authRouter;
