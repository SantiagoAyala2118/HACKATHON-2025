import { Router } from "express";
import authRouter from "./auth.routes.js";
import { projectRouter } from "./project.routes.js";
import { categoryRoutes } from "./category.routes.js";

const router = Router();

router.use(authRouter);
router.use(projectRouter);
router.use(categoryRoutes)

export default router;
