#!/usr/bin/env node

import chalk from "chalk";

import { showTitle } from "./cmd-displayer";
import { executeOption } from "./cmd-interaction";

(async (): Promise<void> => {
  try {
    await showTitle();
    await executeOption();
  } catch (error) {
    console.log(chalk.bgRed(error));
    process.exit(1);
  }
})();
