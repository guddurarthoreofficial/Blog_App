import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // for live server to watch on my Phone
  server: {
    host: true,
  },
  plugins: [react(), tailwindcss()],
});
