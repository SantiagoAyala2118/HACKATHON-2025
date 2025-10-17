import { Router } from "express";
<<<<<<< HEAD
//* CONTROLADORES
import { login, logout, register } from "../controllers/auth.controllers.js";

//* MIDDLEWARES
=======
import { login, logout, register } from "../controllers/auth.controllers.js";
>>>>>>> origin/dev-matu
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
