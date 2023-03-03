import crypto from "crypto-js";

const { enc, SHA256 } = crypto;

const encMap = Object.keys(enc).map((method) => ({
  type: method.toLowerCase(),
  method: enc[method as keyof typeof enc],
}));
const sha256 = (source: string, round: number = 1, encType = "base64") => {
  let arr = enc.Utf8.parse(source);
  for (let i = 0; i < round; i++) {
    arr = SHA256(arr);
  }
  const method = encMap.find((enc) => enc.type === encType.toLowerCase());
  if (!method) {
    throw new Error("invalid enctype: " + encType);
  }
  return arr.toString(method.method);
};

export default { sha256 };
