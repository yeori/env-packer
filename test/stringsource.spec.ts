import { it, describe } from "vitest";
import teleport from "../src/index.js";

describe("index", () => {
  it("TEXT", () => {
    const sources = [
      { path: ".env.development", content: "VITE_APP_MODE=DEV" },
      { path: ".env.production", content: "VITE_APP_MODE=PROD" },
    ];
    teleport.pack(sources, {
      pubKey: ".rsa_key.pub",
      privKey: ".keys/.rsa_key",
      outputPath: "env-teleport-config.json",
    });
  });
  it("TEXT:dec", () => {});
});
