import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  base: "/aqua-tick/",
  plugins: [
    react(),
    vanillaExtractPlugin({ identifiers: ({ hash }) => `prefix_${hash}` }),
  ],
});
