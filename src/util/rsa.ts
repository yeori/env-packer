import crypto, { KeyPairSyncResult } from "crypto";
import files from "./files.js";
import type { IFile } from "./files.js";

export const DEFAULT_FILE_NAME = ".env_pack_key";
export const DEFAULT_PUB_SUFFIX = ".pub";
export const DEFAULT_KEY_SIZE = 2048;

export interface RsaKey {
  readonly publicKey: IFile;
  readonly privateKey: IFile;
}
export interface RsaKeySpec {
  keySize: number;
  baseDir?: string;
  file?: string;
  suffix?: string;
  overwrite?: boolean;
  withKeys?(key: RsaKey): void;
}

const RSA_KEYSIZES = [1024, 2048, 4096];
const encrypt = (plainText: string, rsaKey: string) => {
  const output = crypto.publicEncrypt(
    {
      key: Buffer.from(rsaKey),
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(plainText)
  );
  return output.toString("base64");
};

const decrypt = (encryptedText: string, rsaKey: string) => {
  const decrypted = crypto.privateDecrypt(
    {
      key: Buffer.from(rsaKey),
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(encryptedText, "base64")
  );
  return decrypted.toString("utf-8");
};

const parseFileName = (
  file: string | undefined = DEFAULT_FILE_NAME,
  baseDir: string | undefined
) => {
  if (file.startsWith("/")) {
    // ignore baseDir
    return file;
  }
  const parentPath = baseDir || process.cwd();
  return `${parentPath}/${file}`;
};

const assertKeySize = (size: number) => {
  if (!RSA_KEYSIZES.includes(size)) {
    throw new Error(
      `Invalid key size [${size}]. Choose one of ${RSA_KEYSIZES}`
    );
  }
};

const assertDuplicatedKeys = (spec: RsaKeySpec) => {
  if (spec.overwrite) {
    return;
  }
  const privFilePath = parseFileName(spec.file, spec.baseDir);
  const pubFilePath = `${privFilePath}${spec.suffix}`;
  const existing = files.filterExistingPathes([privFilePath, pubFilePath]);
  if (existing.length > 0) {
    existing.push("Use --overwrite to replace existing keys");
    const pad = "      > ";
    const msg = existing.map((p) => pad + p).join("\n");
    throw new Error(`cannot overwrite existing rsa key.\n${msg}`);
  }
};
const generateKeyPair = (spec: RsaKeySpec): RsaKey => {
  console.log(process.cwd());
  spec.baseDir = spec.baseDir || process.cwd();
  spec.keySize = spec.keySize || DEFAULT_KEY_SIZE;
  spec.suffix = spec.suffix || DEFAULT_PUB_SUFFIX;
  spec.overwrite = spec.overwrite || false;

  assertKeySize(spec.keySize);
  assertDuplicatedKeys(spec);

  const { keySize, suffix, overwrite } = spec;

  const res: KeyPairSyncResult<string, string> = crypto.generateKeyPairSync(
    "rsa",
    {
      modulusLength: keySize,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
    }
  );

  const key: RsaKey = {
    publicKey: {
      path: "",
      content: res.publicKey,
    },
    privateKey: {
      path: "",
      content: res.privateKey,
    },
  };
  /**
   * property 'file' has a higher priority than property 'function'.
   */
  if (spec.file) {
    const privFilePath = parseFileName(spec.file, spec.baseDir);
    const pubFilePath = `${privFilePath}${suffix}`;
    key.privateKey.path = privFilePath;
    key.publicKey.path = pubFilePath;

    files.write(privFilePath, key.privateKey.content, { overwrite });
    files.write(pubFilePath, key.publicKey.content, {
      overwrite,
    });
  } else if (spec?.withKeys) {
    spec.withKeys(key);
  } else {
    // nothing, just return the key
  }

  return key;
};

export default { encrypt, decrypt, generateKeyPair };
