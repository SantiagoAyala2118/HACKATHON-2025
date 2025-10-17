import { Router } from "express";
import authRouter from "./auth.routes.js";
import { projectRouter } from "./project.routes.js";
import { categoryRoutes } from "./category.routes.js";
import { investmentRouter } from "./investment.routes.js";

const router = Router();

router.use(authRouter);
router.use(projectRouter);
<<<<<<< HEAD
router.use(categoryRoutes);
router.use(investmentRouter);
=======
router.use(categoryRoutes)
router.use(investmentRouter)
>>>>>>> origin/dev-matu

export default router;
