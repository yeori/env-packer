// import path from "path";

export interface IDeflateConfig {
  baseDir: string;
  file: string;
}
export class DeflateContext implements IDeflateConfig {
  baseDir: string;
  file: string;
  constructor(option: any) {
    // baseDir = option.baseDir;
    this.baseDir = option.baseDir;
    this.file = option.file;
  }

  run() {
    // const configFilePath = path.resolve(this.baseDir, this.file);
    // const config: ConfigOption = files.read(configFilePath, (content) =>
    //   JSON.parse(content)
    // );
    // main.decrypt(config);
  }
}
