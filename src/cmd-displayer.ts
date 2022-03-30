import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";

import { sleep } from "./helper";

async function showTitle(): Promise<void> {
  const titleAnimation = chalkAnimation.rainbow(
    "Welcome to EncrypterDecrypter"
  );
  await sleep(1);
  titleAnimation.stop();
}

function showEnding(): void {
  console.clear();

  figlet("Encrypter Decrypter", (error, data) => {
    if (error) {
      console.log(chalk.bgRed(error));
      return;
    }
    console.log(gradient.pastel.multiline(data));
  });

  figlet("Until next time!", (error, data) => {
    if (error) {
      console.log(chalk.bgRed(error));
      return;
    }
    console.log(gradient.pastel.multiline(data));
  });
}

export { showTitle, showEnding };
