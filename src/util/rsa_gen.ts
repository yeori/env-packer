import crypto from "crypto";
import fs from "fs";
export interface RsaKey {
  readonly publicKey: string;
  readonly privateKey: string;
}
export interface RsaKeySpec {
  file?: string;
  after?(key: RsaKey): void;
  overwite?: boolean;
}
const writeTo = (fname: string, content: string): void => {
  const flag = "wx";
  fs.writeFileSync(fname, content, { encoding: "utf-8", flag });
};

const parseFileName = (filePath: string) => {
  if (filePath.startsWith("/")) {
    return filePath;
  }
  const parentPath = process.cwd();
  return `${parentPath}/${filePath}`;
};
const generateRsa = (keySize: number = 2048, spec: RsaKeySpec): RsaKey => {
  console.log(process.cwd());
  const key = crypto.generateKeyPairSync("rsa", {
    modulusLength: keySize,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  }) as RsaKey;

  if (spec?.file) {
    writeTo(parseFileName(spec.file), key.privateKey);
    writeTo(parseFileName(`${spec.file}.pub`), key.publicKey);
  } else if (spec?.after) {
    spec.after(key);
  }

  return key;
};

export default generateRsa;
