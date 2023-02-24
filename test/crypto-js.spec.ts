import crypto from "crypto-js";
import { it } from "vitest";
const hash = (source: string, cnt: number = 1024) => {
  let r = crypto.enc.Utf8.parse(source);
  for (let i = 0; i < cnt; i++) {
    r = crypto.SHA256(r);
  }
  return r.toString(crypto.enc.Base64);
};

it("rolling hash", () => {
  const t = "msg 123";
  const out = hash(t);
  // console.log(out);
});
