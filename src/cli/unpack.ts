#!/usr/bin/env ts-node

/**
 * It reconstructs .env files from the encrypted config file.
 */
import parseArg from "minimist";
import path from "path";
import main, { DEFAULT_CONFIG_FILENAME } from "../index.js";
/**
 * --baseDir:string
 *
 */
const args = parseArg(process.argv, {
  default: {
    baseDir: process.cwd(),
    file: DEFAULT_CONFIG_FILENAME,
  },
});

const configPath = path.resolve(args.baseDir, args.file);
main.unpack(configPath);
// const ctx = new DeflateContext(args);
// ctx.deflate();
