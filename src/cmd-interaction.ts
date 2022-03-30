import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { showEnding } from "./cmd-displayer";

import { encryptData, decryptData } from "./cryptography";
import { sleep } from "./helper";

async function executeOption(): Promise<void> {
  let isStopped: boolean = false;

  do {
    const { optionFromInput } = await inquirer.prompt({
      name: "optionFromInput",
      type: "input",
      message: chalk.white(
        `Enter an option:\n 1: Encrypt\n 2: Decrypt\n 3: Quit\n`
      ),
    });

    const optionAsNumber: number = parseInt(optionFromInput);

    if (Number.isInteger(optionAsNumber)) {
      switch (optionAsNumber) {
        case 1:
          await promptForEncryption();
          break;

        case 2:
          await promptForDecryption();
          break;

        case 3:
          isStopped = true;
          showEnding();
          break;

        default:
          console.log(chalk.bgRed("You must select a valid option..."));
          break;
      }

      if (!isStopped) {
        const { repeatOptionInput } = await inquirer.prompt({
          name: "repeatOptionInput",
          type: "input",
          message: chalk.white(`Enter an option:\n 1: Replay\n 2: Quit\n`),
        });

        const repeatOptionAsNumber: number = parseInt(repeatOptionInput);

        switch (repeatOptionAsNumber) {
          case 1:
            isStopped = false;
            break;

          case 2:
            isStopped = true;
            showEnding();
            break;

          default:
            console.log(chalk.bgRed("You must select a valid option..."));
            break;
        }
      }
    } else {
      console.log(chalk.bgRed("You must enter a number..."));
    }
  } while (!isStopped);
}

async function promptForEncryption(): Promise<void> {
  const secretKey: string = await readSecretKeyInput(
    chalk.white("Enter the Secret Key for encryption:")
  );
  const dataToEncrypt: string = await readDataInput("Enter data to encrypt:");
  await encryptData(secretKey, dataToEncrypt);
}

async function promptForDecryption(): Promise<void> {
  const secretKey: string = await readSecretKeyInput(
    chalk.white("Enter the Secret Key for decryption:")
  );
  const dataToDecrypt: string = await readDataInput("Enter data to decrypt:");
  await decryptData(secretKey, dataToDecrypt);
}

async function readSecretKeyInput(message: string): Promise<string> {
  const { secretKey } = await inquirer.prompt({
    name: "secretKey",
    type: "input",
    message,
  });

  await checkIfLengthOfKeyIsValid(secretKey);
  console.log(chalk.white(`Your secret key is: ${chalk.green(secretKey)}`));

  return secretKey;
}

async function checkIfLengthOfKeyIsValid(secretKey: string): Promise<void> {
  const spinner = createSpinner(
    chalk.white("Verifying Secret Key length...")
  ).start();

  await sleep(1);

  const isKeyValid: boolean = secretKey.length >= 16;

  if (isKeyValid) {
    spinner.success({ text: chalk.green("Secret Key is valid.") });
  } else {
    spinner.error({
      text: chalk.red("Secret key must be atleast 16 characters..."),
    });
    process.exit(1);
  }
}

async function readDataInput(message: string): Promise<string> {
  const { data } = await inquirer.prompt({
    name: "data",
    type: "input",
    message: chalk.white(message),
  });

  return data;
}

export { executeOption };
