import "dotenv/config"; // allows me to hide my enviorment vars that I don't want other people seeing(like my API key)
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";


// Setting up our express server
const app = express();

// Security Middleware

app.use(helmet());
app.use(
    cors({
         origin: process.env.FRONTEND_URL || "http://localhost:3000",
         credentials : true,
    })
);
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: "Too many requests from this IP, please try again after some time",
});
app.use(limiter);
app.use(express.json({ limit: "10mb"}));

// End of server setup

// 

app.post("/api/explain-code", async (req, res) => {
    try {
        const { code, language } = req.body;
        if(!code) {
            return res.status(400).json({ error: "Code is required!"});
        }
    } catch (err) {
        console.error("Code Explain API Error: ", err);
        res.status(500).json({error: "Server error", details: err.message});
    }
    
})