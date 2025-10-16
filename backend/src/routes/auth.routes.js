import { Router } from "express";
import { login, logout, register } from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", authMiddleware, logout);

export default authRouter;
