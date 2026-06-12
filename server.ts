import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely
const getGeminiAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

async function startServer() {
  // Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, language = "en" } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const ai = getGeminiAI();
      if (!ai) {
        // Fallback if key is missing
        const fallbackMsg =
          language === "fr"
            ? "Bonjour ! L'assistant de Shield Corporation est actuellement en mode démo (la clé API n'est pas configurée dans les variables d'environnement). Comment puis-je vous aider ?"
            : "Hello! The Shield Corporation assistant is currently in demo mode (the API key is not configured in the environment variables). How can I assist you today?";
        return res.json({ text: fallbackMsg });
      }

      const systemInstruction = 
        language === "fr"
          ? "Vous êtes 'Le Protecteur', l'intelligence artificielle de cybersécurité de la Shield Corporation. Répondez de manière professionnelle, courte et rassurante en français. Vous aidez les clients à sécuriser leurs réseaux, gérer leurs incidents cybernétiques, et présentez les services de la Shield Corporation (Administration réseau, Pentesting, Sécurité Cloud, SOC, etc.)."
          : "You are 'The Shield Assistant', the cyber-security AI assistant of The Shield Corporation. Respond professionally, concisely, and reassuringly in English. You help clients secure their networks, manage cyber incidents, and present the services of The Shield Corporation (Network administration, Pentesting, Cloud Security, SOC, etc.).";

      // Reconstruct conversation messages using the correct format for ai.models.generateContent
      const formattedContents = [];
      if (history && Array.isArray(history)) {
        for (const h of history) {
          formattedContents.push({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.text }],
          });
        }
      }
      // Append user's current message
      formattedContents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini Chat API Error:", error);
      res.status(500).json({ error: error.message || "Something went wrong" });
    }
  });

  // Setup Vite or Static assets depending on env
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server executing at http://localhost:${PORT}`);
  });
}

startServer();
