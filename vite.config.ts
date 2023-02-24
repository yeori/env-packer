import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // target: ["node14"],
    copyPublicDir: false,
    outDir: "dist",
    lib: {
      // name: "env-tp",
      entry: path.resolve(__dirname, "src/main.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `env-teleport.${format}.js`,
    },
    rollupOptions: {
      external: ["crypto-js"],
    },
  },
});
