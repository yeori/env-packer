import crypto from "crypto-js";
import hasing from "./hasing.js";

export interface AesResponse {
  readonly output: string;
  readonly seed: string;
}

const toWordArray = crypto.enc.Utf8.parse;

const generateSeed = (text: string): string => {
  const s0: string = hasing.sha256(text, 128);
  const s1: string = hasing.sha256(s0, 128);
  return s0 + s1;
};

const aes = {
  encrypt: (plainText: string): AesResponse => {
    const h = generateSeed(plainText);
    const secretKey = h.substring(0, 32);
    const iv = h.substring(32, 32 + 16);

    const cipher = crypto.AES.encrypt(plainText, toWordArray(secretKey), {
      iv: toWordArray(iv),
      padding: crypto.pad.Pkcs7,
      mode: crypto.mode.CBC,
    });
    return { output: cipher.toString(), seed: secretKey + iv };
  },
  decrypt: (cipherText: string, seed: string): any => {
    const secretKey = seed.substring(0, 32);
    const iv = seed.substring(32);
    const cipher = crypto.AES.decrypt(cipherText, toWordArray(secretKey), {
      iv: toWordArray(iv),
      padding: crypto.pad.Pkcs7,
      mode: crypto.mode.CBC,
    });
    return cipher.toString(crypto.enc.Utf8);
  },
};
export default aes;
