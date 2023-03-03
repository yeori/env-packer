import cryptoUtil from "./crypto-util.js";
import type { AesResponse } from "./util/aes.js";
import { files, rsa } from "./util/index.js";
import { IFile } from "./util/files.js";

export const DEFAULT_CONFIG_FILENAME = "env-pack-config.json";

/**
 * file info
 *
 * @interface IFile
 *
 * @emeber {string} name - name of file
 * @member {string} content - content of file
 */

export interface EncryptOption {
  readonly baseDir?: string;
  readonly pubKey: string;
  readonly privKey: string;
  readonly outputPath: string;
}

export interface DecryptOption {
  readonly body: string;
  readonly seed: string;
  readonly key: string;
}
const generatePackedFile = (cipher: AesResponse, encOption: EncryptOption) => {
  const { outputPath, pubKey, privKey } = encOption;
  const rsaKey = files.read(pubKey);
  const seed = rsa.encrypt(cipher.seed, rsaKey);

  const output: DecryptOption = {
    body: cipher.output,
    seed,
    key: privKey,
  };

  files.write(outputPath, JSON.stringify(output));
};
const pack = (sources: Array<IFile>, option: EncryptOption) => {
  const json = JSON.stringify(sources);
  const cipher = cryptoUtil.aes.encrypt(json);
  generatePackedFile(cipher, option);
};

const generateEnvFiles = (sources: Array<IFile>) => {
  sources.forEach((file: IFile) => {
    const { path, content } = file;
    files.write(path, content, { mkdir: true });
  });
};
const unpackEnv = (option: DecryptOption) => {
  const rsaKey = files.read(option.key);
  const seed = rsa.decrypt(option.seed, rsaKey);
  const jsonText = cryptoUtil.aes.decrypt(option.body, seed);
  const sources: Array<IFile> = JSON.parse(jsonText);
  generateEnvFiles(sources);
};
const unpack = (configFilePath: string) => {
  const option: DecryptOption = files.read(configFilePath, (content) =>
    JSON.parse(content)
  );
  unpackEnv(option);
};

export default { pack, unpack, unpackEnv };
