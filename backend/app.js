import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors"
import { corsConfig } from './src/config/corsConfig.js';
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsConfig))

export default app