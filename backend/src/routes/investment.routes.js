import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addInvestment } from "../controllers/investment.controller.js";

export const investmentRouter = Router();

investmentRouter.post("/investment", authMiddleware, addInvestment);
