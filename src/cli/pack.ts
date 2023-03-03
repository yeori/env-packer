#!/usr/bin/env ts-node

import parseArg from "minimist";
import { globSync } from "glob";
import files from "..//util/files.js";
import type { IFile } from "..//util/files.js";
import path from "path";
import main, { DEFAULT_CONFIG_FILENAME } from "../index.js";
import { DEFAULT_FILE_NAME, DEFAULT_PUB_SUFFIX } from "../util/rsa.js";
/**
 * env: string
 *
 * glob pattern
 */
const args = parseArg(process.argv, {
  string: ["env", "baseDir", "key", "outDir", "outFile"],
  default: {
    env: ".env*",
    baseDir: process.cwd(),
    key: DEFAULT_FILE_NAME + DEFAULT_PUB_SUFFIX,
    output: { key: { path: "" } },
    outDir: process.cwd(),
    outFile: DEFAULT_CONFIG_FILENAME,
  },
});
console.log("[ARGUEMTNS]", args);

const resolvePrivKey = () => {
  if (args.output.key.path) {
    return args.output.key.path;
  }
  const pubKey: string = args.key;
  if (pubKey.endsWith(DEFAULT_PUB_SUFFIX)) {
    args.output.key.path = pubKey.substring(
      0,
      pubKey.length - DEFAULT_PUB_SUFFIX.length
    );
  } else {
    throw new Error(
      `cannot infer the path of private key. use --output.key.path="..." `
    );
  }
  return args.output.key.path;
};
const pack = () => {
  const envFiles = globSync(args.env, { nodir: true });
  const entries: IFile[] = envFiles.map((path) =>
    files.read(path, (content) => {
      return { path, content } as IFile;
    })
  );
  console.log(`[${entries.length}] file(s) will be packed`);
  entries.forEach((entry) => console.log(" > " + entry.path));
  const { outDir, outFile } = args;
  const outputPath = path.resolve(outDir, outFile);
  const pubKey = args.key;
  const privKey = resolvePrivKey();
  main.pack(entries, {
    baseDir: args.baseDir,
    privKey,
    pubKey,
    outputPath,
  });
};
pack();
