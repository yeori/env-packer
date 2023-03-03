import crypto from "crypto-js";
import { it, assert, describe } from "vitest";

describe("crypto-js: WordArray", () => {
  it("crypto-js:WordArray:data", () => {
    /**
     * A: 41, B: 42, C: 43, B: 44
     * a: 61, b: 62, c: 63, d: 64
     */
    const t = "ABCDabcd";
    const arr: crypto.lib.WordArray = crypto.enc.Utf8.parse(t);

    const [ABCD, abcd]: number[] = arr.words;
    assert.equal(ABCD.toString(16), "41424344");
    assert.equal(abcd.toString(16), "61626364");

    assert.equal(arr.toString(crypto.enc.Utf8), t);
  });
});
