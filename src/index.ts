import cryptoUtil from "@/crypto-util";

/**
 * source of file
 *
 * @interface ISource
 *
 * @emeber {string} name - name of file
 * @member {string} content - content of file
 */
interface ISource {
  readonly name: string;
  readonly content: string;
}

const encrypt = (source: Array<ISource>, outFileName: string) => {};

export default { encrypt };
