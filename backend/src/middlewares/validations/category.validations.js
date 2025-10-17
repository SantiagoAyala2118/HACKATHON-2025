import { body } from "express-validator";
import { CategoryModel } from "../../models/category.model.js";

export const createCategoryValidations = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Título requerido")
    .isString()
    .withMessage("El título debe ser un string")
    .custom(async (value) => {
      try {
        const categoryExisting = await CategoryModel.findOne({ title: value });

        if (categoryExisting) {
          return Promise.reject("El título de esa categoría ya está en uso");
        }
      } catch (e) {
        console.error("Error interno del servidor", e);
        return Promise.reject("Error interno del servidor");
      }
    }),
];
