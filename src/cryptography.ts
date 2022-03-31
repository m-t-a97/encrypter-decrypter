import cryptojs from "crypto-js";

import chalk from "chalk";
import { createSpinner } from "nanospinner";

import { sleep } from "./helper";

async function encryptData(
  secretKey: string,
  dataToEncrypt: string
): Promise<void> {
  const spinner = createSpinner(
    chalk.white(`Encrypting data: ${dataToEncrypt}`)
  ).start();

  await sleep(1);

  const encryptedData = cryptojs.AES.encrypt(
    dataToEncrypt,
    secretKey
  ).toString();

  spinner.success({
    text: chalk.white(`Your encrypted data is: ${chalk.green(encryptedData)}`),
  });
}

async function decryptData(
  secretKey: string,
  dataToDecrypt: string
): Promise<void> {
  const spinner = createSpinner(
    chalk.white(`Decrypting data: ${dataToDecrypt}`)
  ).start();

  await sleep(1);

  const decryptedData = cryptojs.AES.decrypt(dataToDecrypt, secretKey).toString(
    cryptojs.enc.Utf8
  );

  spinner.success({
    text: chalk.white(`Your decrypted data is: ${chalk.green(decryptedData)}`),
  });
}

export { encryptData, decryptData };
