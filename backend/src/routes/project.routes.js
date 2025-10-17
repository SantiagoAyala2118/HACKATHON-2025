import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectByCategory,
  updateProject,
} from "../controllers/project.controllers.js";
import {
  createProjectValidations,
  getProjectByCategoryValidations,
  getProjectByIdValidations,
  updateProjectValidations,
} from "../middlewares/validations/project.validations.js";
import { validator } from "../middlewares/validator.js";

export const projectRouter = Router();

projectRouter.post(
  "/projects",
  authMiddleware,
  createProjectValidations,
  validator,
  createProject
);
projectRouter.get(
  "/projects/categories",
  authMiddleware,
  getProjectByCategoryValidations,
  validator,
  getProjectByCategory
);
projectRouter.get("/projects", authMiddleware, getAllProjects);
projectRouter.delete(
  "/projects/:idProject",
  authMiddleware,
  getProjectByIdValidations,
  validator,
  deleteProject
);
projectRouter.put(
  "projects/:idProject",
  authMiddleware,
  updateProjectValidations,
  validator,
  updateProject
);
