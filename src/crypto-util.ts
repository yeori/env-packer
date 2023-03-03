import { hasing, aes } from "./util/index.js";

const sha256 = {
  hex: (plainText: string): string => hasing.sha256(plainText, 1, "hex"),
};

export default {
  aes,
  sha256,
};
