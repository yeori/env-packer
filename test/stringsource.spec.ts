import { it, describe } from "vitest";
import teleport from "../src";

describe("TEXT", () => {
  it("TEXT", () => {
    const sources = [
      { name: ".env.development", content: "VITE_APP_MODE=DEV" },
      { name: ".env.production", content: "VITE_APP_MODE=PROD" },
    ];
    teleport.encrypt(sources, ".env.njns");
  });
});
