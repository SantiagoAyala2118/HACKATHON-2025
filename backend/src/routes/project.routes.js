import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createProject, deleteProject, getAllProjects, getProjectByCategory, updateProject } from "../controllers/project.controllers.js";

export const projectRouter = Router()

projectRouter.post("/projects", authMiddleware, createProject)
projectRouter.get("/projects/categories", authMiddleware, getProjectByCategory)
projectRouter.get("/projects", authMiddleware, getAllProjects)
projectRouter.delete("/projects/:idProject", authMiddleware, deleteProject)
projectRouter.put("projects/:idProject", authMiddleware, updateProject)