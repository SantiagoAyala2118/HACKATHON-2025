import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
<<<<<<< HEAD
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectByCategory,
  updateProject,
} from "../controllers/project.controllers.js";
import {
  createProjectValidations,
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
projectRouter.get("/projects/categories", authMiddleware, getProjectByCategory);
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
=======
import { createProject, deleteProject, getAllProjects, getProjectByCategory, updateProject } from "../controllers/project.controllers.js";

export const projectRouter = Router()

projectRouter.post("/projects", authMiddleware, createProject)
projectRouter.get("/projects/categories", authMiddleware, getProjectByCategory)
projectRouter.get("/projects", authMiddleware, getAllProjects)
projectRouter.delete("/projects/:idProject", authMiddleware, deleteProject)
projectRouter.put("projects/:idProject", authMiddleware, updateProject)
>>>>>>> origin/dev-matu
