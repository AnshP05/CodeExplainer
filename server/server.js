import "dotenv/config"; // allows me to hide my enviorment vars that I don't want other people seeing(like my API key)
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import OpenAI from "openai";


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

// Creating the endpoint with OpenAi
const API_KEY = process.env.OPENAI_API_KEY;

const client = new OpenAI({
    apiKey: API_KEY,
});

app.post("/api/explain-code", async (req, res) => {
    try {
        const { code, language } = req.body;
        if (!code) {
            return res.status(400).json({ error: "Code is required!" });
        }

        const prompt = `
        Explain this ${language || ""} code in simple beginner-friendly terms.

        \`\`\`${language || ""}
        ${code}
        \`\`\`
        `;

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a friendly code explainer. Explain code step-by-step in very simple terms.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.3,
            max_tokens: 800,
        });

        const explanation = response?.choices?.[0]?.message?.content;

        if (!explanation) {
            return res.status(500).json({ error: "Failed to explain code" });
        }

        res.json({ explanation, language: language || "unknown" });
    } catch (err) {
        console.error("Code Explain API Error: ", err);
        res.status(500).json({ error: "Server error", details: err.message });
    }
});


const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`API Server listening on http://localhost:${PORT}`)
});

