import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addInvestment } from "../controllers/investment.controller.js";
import { createInvestmentValidations } from "../middlewares/validations/investment.validations.js";
import { validator } from "../middlewares/validator.js";

export const investmentRouter = Router();

investmentRouter.post(
  "/investment",
  authMiddleware,
  createInvestmentValidations,
  validator,
  addInvestment
);
