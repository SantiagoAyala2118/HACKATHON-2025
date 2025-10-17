<<<<<<< HEAD
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors"
import { corsConfig } from './src/config/corsConfig.js';
import { routes } from './src/routes/index.routes.js';
const app = express()
=======
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsConfig } from "./src/config/corsConfig.js";
import router from "./src/routes/index.js";
const app = express();
>>>>>>> dev-santi

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsConfig));

<<<<<<< HEAD
app.use("/api", routes)
export default app
=======
app.use("/api", router);

export default app;
>>>>>>> dev-santi
