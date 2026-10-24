import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tailwindcss()],
    define: {
      __PUBLIC_API_BASE_URL__: JSON.stringify(process.env.API_BASE_URL || env.API_BASE_URL || env.VITE_API_BASE_URL || ""),
      __PUBLIC_GOOGLE_CLIENT_ID__: JSON.stringify(process.env.GOOGLE_CLIENT_ID || env.GOOGLE_CLIENT_ID || env.VITE_GOOGLE_CLIENT_ID || ""),
      __PUBLIC_CORPORATE_URL__: JSON.stringify(process.env.CORPORATE_URL || env.CORPORATE_URL || env.VITE_CORPORATE_URL || "http://localhost:3000"),
    },
    resolve: { alias: { "@": path.resolve(__dirname, ".") } },
    server: { port: 3001, allowedHosts: [".ngrok-free.app", ".ngrok-free.dev", ".ngrok.io"] },
  };
});

