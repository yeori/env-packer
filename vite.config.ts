/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // target: ["node14"],
    copyPublicDir: false,
    outDir: "dist",

    lib: {
      // name: "env-tp",
      entry: [path.resolve(__dirname, "src/index.ts")],
      formats: ["es", "cjs"],
      fileName: (format, entryName) => {
        if ("cli" === entryName) {
          return `cli.${format}.js`;
        } else {
          return `env-packer.${format}.js`;
        }
      },
    },
    rollupOptions: {
      external: ["crypto-js", "minimist"],
      output: {
        exports: "named",
      },
    },
  },
  resolve: {
    mainFields: ["main"],
    alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }],
  },
  test: {
    coverage: {
      provider: "istanbul",
    },
  },
});
