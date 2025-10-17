import { body, param } from "express-validator";
import { ProjectModel } from "../../models/project.model.js";

export const createInvestmentValidations = [
  body("project")
    .trim()
    .notEmpty()
    .withMessage("Id del proyecto requerido")
    .custom(async (value) => {
      try {
        const projectExisting = await ProjectModel.findById(value);

        if (!projectExisting) {
          return Promise.reject("Ese projecto no existe");
        }
      } catch (e) {
        console.error("Error interno del servidor", e);
        return Promise.reject("Error interno del servidor");
      }
    }),
  body("amount")
    .trim()
    .notEmpty()
    .withMessage("La cantidad de inversión requerida")
    .isInt()
    .withMessage("La cantidad de inversión debe ser un numero"),
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
