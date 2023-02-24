import { it, expect, describe, assert, afterAll } from "vitest";
import generateRsa from "../../src/util/rsa_gen";
import fs from "fs";

const RSA_PRV_FILE = ".rsa_key";
const RSA_PUB_FILE = ".rsa_key.pub";

afterAll(() => {
  console.log("[DELETE KEY FILES]");
  fs.unlinkSync(RSA_PRV_FILE);
  fs.unlinkSync(RSA_PUB_FILE);
});
describe("RSA", () => {
  it("key files", () => {
    const rsa = generateRsa(2048, {
      file: RSA_PRV_FILE,
    });
    assert.isTrue(fs.existsSync(RSA_PRV_FILE));
    assert.isTrue(fs.existsSync(RSA_PUB_FILE));
  });

  it("callback", () => {
    const rsa = generateRsa(2048, {
      after: (key) => {
        assert.isNotEmpty(key.publicKey);
        assert.isNotEmpty(key.privateKey);
      },
    });
  });

  it("fails if any file exists", () => {
    fs.writeFileSync(RSA_PRV_FILE, "");
    fs.writeFileSync(RSA_PUB_FILE, "");
    expect(() => {
      generateRsa(2048, { file: RSA_PRV_FILE });
    }).toThrowError();
  });
});
