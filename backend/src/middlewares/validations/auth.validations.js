import { body } from "express-validator";
import UserModel from "../../models/user.model.js";

export const registerValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Nombre requerido")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El nombre debe contener sólo letras"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email requerido")
    .isEmail()
    .withMessage("El formato del email no es correcto")
    .custom(async (value) => {
      try {
        const emailExisting = await UserModel.findOne({ email: value });
        if (emailExisting) {
          return Promise.reject("El email elegido ya está en uso");
        }
      } catch (e) {
        console.error("Error interno del servidor", e);
        return Promise.reject("Error interno del servidor", e);
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Contraseña requerida")
    .isLength({ min: 6 })
    .withMessage("Debe contener al menos 6 caracteres"),
  body("biography")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La biografía no puede estar vacía"),
];

export const loginValidations = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email requerido")
    .isEmail()
    .withMessage("El formato del email no es correcto"),
];
