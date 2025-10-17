import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// ✅ Configuración corregida para Vercel
export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    transformer: "postcss", // Desactiva lightningcss (causa del error)
  },
  build: {
    outDir: "dist", // Carpeta de salida del build
  },
});

