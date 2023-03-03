import fs from "fs";
import path from "path";

export interface IFile {
  path: string;
  content: string;
}

interface IWriteSpec {
  overwrite?: boolean;
  mkdir?: boolean;
}

const DEFAULT_WRITE_OPTION = {
  overwrite: false,
  mkdir: false,
};

const createDirectories = (p: string) => {
  const isAbsolutePath = p.startsWith("/");
  const hasSlash = p.indexOf("/") >= 0;
  const fileName = hasSlash ? p.substring(p.lastIndexOf("/") + 1) : p;
  const midPath = p.substring(0, p.length - fileName.length);
  const baseDir = isAbsolutePath
    ? midPath
    : path.resolve(process.cwd(), midPath);

  fs.mkdirSync(baseDir, { recursive: true });
};
const write = (fileName: string, content: string, option?: IWriteSpec) => {
  option = option || DEFAULT_WRITE_OPTION;
  option.overwrite = option.overwrite || DEFAULT_WRITE_OPTION.overwrite;
  const flag = option.overwrite ? "w" : "wx";
  createDirectories(fileName);
  fs.writeFileSync(fileName, content, { encoding: "utf-8", flag });
};
const read = (filePath: string, mapper?: (content: string) => any) => {
  const content = fs.readFileSync(filePath, { encoding: "utf-8" });
  if (mapper) {
    return mapper(content);
  } else {
    return content;
  }
};

const filterExistingPathes = (pathes: string[]): string[] =>
  pathes.filter((path) => fs.existsSync(path));
export default {
  read,
  write,
  filterExistingPathes,
};
