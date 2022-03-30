import * as crypto from "crypto";

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

  const keyBuffer: Buffer = Buffer.from(secretKey, "utf8");
  const ivBuffer: Buffer = Buffer.alloc(0);
  const cipher: crypto.Cipher = crypto.createCipheriv(
    "AES-128-ECB",
    keyBuffer,
    ivBuffer
  );
  let encryptedData: string = cipher.update(dataToEncrypt, "utf8", "hex");
  encryptedData += cipher.final("hex");

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

  const keyBuffer = Buffer.from(secretKey, "utf8");
  const ivBuffer = Buffer.alloc(0);
  const cipher = crypto.createDecipheriv("AES-128-ECB", keyBuffer, ivBuffer);
  let decryptedData: string = cipher.update(dataToDecrypt, "hex", "utf-8");
  decryptedData += cipher.final("utf-8");

  spinner.success({
    text: chalk.white(`Your decrypted data is: ${chalk.green(decryptedData)}`),
  });
}

export { encryptData, decryptData };
