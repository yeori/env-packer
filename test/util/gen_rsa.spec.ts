import { it, expect, describe, assert, afterAll } from "vitest";
import rsa from "../../src/util/rsa";
import fs from "fs";

const RSA_PRV_FILE = ".rsa_key.test";
const RSA_PUB_FILE = ".rsa_key.test.pub";

afterAll(() => {
  fs.unlinkSync(RSA_PRV_FILE);
  fs.unlinkSync(RSA_PUB_FILE);
});
describe("RSA", () => {
  const { generateKeyPair } = rsa;
  it("gnerate files", () => {
    const rsa = generateKeyPair({
      keySize: 2048,
      file: RSA_PRV_FILE,
    });
    assert.isTrue(fs.existsSync(RSA_PRV_FILE));
    assert.isTrue(fs.existsSync(RSA_PUB_FILE));
  });

  it("callback", () => {
    const rsa = generateKeyPair({
      keySize: 2048,
      withKeys: (key) => {
        assert.isNotEmpty(key.publicKey);
        assert.isNotEmpty(key.privateKey);
      },
    });
  });

  it("fails if any file exists", () => {
    fs.writeFileSync(RSA_PRV_FILE, "");
    fs.writeFileSync(RSA_PUB_FILE, "");
    expect(() => {
      generateKeyPair({ keySize: 2048, file: RSA_PRV_FILE });
    }).toThrowError();
  });
});
