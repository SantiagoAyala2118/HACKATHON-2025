import { Router } from "express";
<<<<<<< HEAD
//*CONTROLADORES
import { addCategory } from "../controllers/category.controllers.js";
//*MIDDLEWARES
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createCategoryValidations } from "../middlewares/validations/category.validations.js";
import { validator } from "../middlewares/validator.js";

export const categoryRoutes = Router();

categoryRoutes.post(
  "/category",
  authMiddleware,
  createCategoryValidations,
  validator,
  addCategory
);
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addCategory } from "../controllers/category.controllers.js";
=======
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addCategory } from "../controllers/category.controllers.js";

export const categoryRoutes = Router()

categoryRoutes.post("/category", authMiddleware, addCategory)
>>>>>>> origin/dev-matu
