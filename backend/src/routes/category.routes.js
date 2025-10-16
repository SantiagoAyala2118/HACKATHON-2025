import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addCategory } from "../controllers/category.controllers.js";

export const categoryRoutes = Router()

categoryRoutes.post("/category", authMiddleware, addCategory)