#!/usr/bin/env ts-node

import parseArg from "minimist";
import rsa from "../util/rsa.js";

import {
  DEFAULT_FILE_NAME,
  DEFAULT_PUB_SUFFIX,
  DEFAULT_KEY_SIZE,
} from "../util/rsa.js";

/**
 * --file -f
 * rsa file name
 * default: ".env_pack_key"
 *
 * --size -s
 * rsa key size: [1024, 2048, 4096]
 * default: 2048
 *
 * --suffix
 * public key filename suffix.
 * default: ".pub"
 *
 * --overwrite
 * if true, overwrite existing public, private keys, otherwisze throw error if any of files exist
 */
const args = parseArg(process.argv, {
  string: ["baseDir", "file", "suffix"],
  boolean: ["overwrite"],
  alias: { size: ["s"], file: ["f"], help: ["h"] },
  default: {
    baseDir: process.cwd(),
    size: DEFAULT_KEY_SIZE,
    file: DEFAULT_FILE_NAME,
    suffix: DEFAULT_PUB_SUFFIX,
    overwrite: false,
    help: false,
  },
});

const trim = (props: string[], obj: any) =>
  props
    .filter((prop) => typeof obj[prop] === "string")
    .forEach((prop) => (obj[prop] = obj[prop].trim()));

const normalize = (args: any) => {
  trim("file,suffix".split(","), args);
  const { file, suffix } = args;
  if (file.length === 0) {
    args.file = args.f = DEFAULT_FILE_NAME;
  }
  if (suffix.length === 0) {
    args.suffix = args.s = DEFAULT_PUB_SUFFIX;
  }
};

normalize(args);

const key = rsa.generateKeyPair({
  baseDir: args.baseDir,
  keySize: args.size,
  file: args.file,
  suffix: args.suffix,
  overwrite: args.overwrite,
});
console.log("[RSA] private key: ", key.privateKey.path);
console.log("[RSA] public  key: ", key.publicKey.path);
