// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/My-Portfolio/",
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
});
