import { body, param } from "express-validator";
import InvestmentModel from "../../models/investment.model.js";

export const createInvestmentValidations = [
  body("details")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Los detalles de inversión no pueden estar vacíos")
    .isLength({ max: 500 })
    .withMessage(
      "Los detalles de inversión solo admiten un máximo de 500 caracteres"
    ),
];
