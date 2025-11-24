import "dotenv/config"; // allows me to hide my enviorment vars that I don't want other people seeing(like my API key)
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const app = express();

// Security Middleware

app.use(helmet());
app.use(
    cors({
         origin: process.env.FRONTEND_URL || "http://localhost:3000"
    })
)