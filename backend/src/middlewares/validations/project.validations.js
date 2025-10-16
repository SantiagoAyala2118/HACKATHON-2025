import { body, param } from "express-validator";
import { ProjectModel } from "../../models/project.model.js";

export const createProjectValidations = [
  body("title").trim().notEmpty().withMessage("Título requerido"),
  body("summary")
    .trim()
    .notEmpty()
    .withMessage("Resumen del projecto requerido"),
  body("businessModel")
    .trim()
    .notEmpty()
    .withMessage("El modelo de negocio es requerido")
    .isLength({ max: 1000 })
    .withMessage(
      "El máximo de caracteres que el modelo de negocio admite es de 1000"
    ),
  body("marketPotencial")
    .trim()
    .notEmpty()
    .withMessage("El potencial de mercado es requerido")
    .isLength({ max: 1000 }),
  body("fundingGoal")
    .trim()
    .notEmpty()
    .withMessage("La meta de financiación es obligatoria")
    .matches(/^[0-9]+$/)
    .withMessage("Sólo se aceptan valores numéricos"),
  body("minInvestment")
    .trim()
    .notEmpty()
    .withMessage("La inversión mínima aceptada es requerida")
    .matches(/^[0-9]+$/)
    .withMessage("Sólo se aceptan valores numéricos"),
];

export const getProjectByIdValidations = [
  param("idProject").custom(async (value) => {
    try {
      const projectExisting = await ProjectModel.findOne({ _id: value });

      if (!projectExisting) {
        return Promise.reject("El proyecto que está buscando no existe");
      }
    } catch (e) {
      console.error("Error interno del servidor", e);
      return Promise.reject("Error interno del servidor");
    }
  }),
];

export const updateProjectValidations = [
  //* PARAM
  param("idProject").custom(async (value) => {
    try {
      const projectExisting = await ProjectModel.findOne({ _id: value });

      if (!projectExisting) {
        return Promise.reject("El proyecto que está buscando no existe");
      }
    } catch (e) {
      console.error("Error interno del servidor", e);
      return Promise.reject("Error interno del servidor");
    }
  }),
  //* BODY
  body("title").optional().trim().notEmpty().withMessage("Título requerido"),
  body("summary")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Resumen del projecto requerido"),
  body("businessModel")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El modelo de negocio es requerido")
    .isLength({ max: 1000 })
    .withMessage(
      "El máximo de caracteres que el modelo de negocio admite es de 1000"
    ),
  body("marketPotencial")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El potencial de mercado es requerido")
    .isLength({ max: 1000 }),
  body("fundingGoal")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La meta de financiación es obligatoria")
    .matches(/^[0-9]+$/)
    .withMessage("Sólo se aceptan valores numéricos"),
  body("minInvestment")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La inversión mínima aceptada es requerida")
    .matches(/^[0-9]+$/)
    .withMessage("Sólo se aceptan valores numéricos"),
];
