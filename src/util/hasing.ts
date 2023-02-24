import crypto from "crypto-js";

const encMap = (Object.keys(crypto.enc) as Array<string>).map((method) => ({
  type: method.toLowerCase(),
  method: crypto.enc[method as keyof typeof crypto.enc],
}));
const sha256 = (source: string, cnt: number = 1, encType = "base64") => {
  let arr = crypto.enc.Utf8.parse(source);
  for (let i = 0; i < cnt; i++) {
    arr = crypto.SHA256(arr);
  }
  const method = encMap.find((enc) => enc.type === encType.toLowerCase());
  if (!method) {
    throw new Error("invalid enctype: " + encType);
  }
  return arr.toString(method?.method);
};

export default { sha256 };
