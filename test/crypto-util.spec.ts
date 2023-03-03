import { it, expect, describe } from "vitest";
import encUtil from "../src/crypto-util";
import { AesResponse } from "../src/util/aes.js";

describe("crypto-util", () => {
  it('hex form of sha256("env-teleport")', () => {
    const hash = encUtil.sha256.hex("env-teleport");
    expect(hash).toBe(
      "d905c6d6aca1844a1d4012178969712f631550485f968977e818c332c246b89f"
    );
  });

  it("AES secretKey(X), IV(X)", () => {
    const plainText = "sunday morning!";

    const cipher: AesResponse = encUtil.aes.encrypt(plainText);

    const decryptedText = encUtil.aes.decrypt(cipher.output, cipher.seed);

    expect(decryptedText).toBe(plainText);
  });
});
