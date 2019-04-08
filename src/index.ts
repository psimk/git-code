import async from "./async";
import { Command } from "commander";
import * as packageJson from "../package.json";
import { v4 as uuid } from "uuid";
import chalk from "chalk";

const COMMANDS = {
  check: "git --version",
  clone: "git clone"
};

const GITHUB_WEBSITE = "https://github.com";
const TEMP_DIR = `${"${TMPDIR}"}${uuid()}`;

const logger = (message: string, type: "log" | "info" | "error") => (
  ...args: any[]
) => console[type](...args, message);

(async () => {
  let repoName;

  new Command(packageJson.name)
    .version(packageJson.version)
    .arguments("<repo-name>")
    .usage(`${chalk.green("<repo-name>")}`)
    .action(repo => {
      repoName = repo;
    })
    .parse(process.argv);

  try {
    await async.exec(COMMANDS.check);
  } catch (err) {
    logger(`unable to execute ${COMMANDS.check}`, "error")();
    logger(err, "error")();
  }

  let command = `${COMMANDS.clone} ${GITHUB_WEBSITE}/${repoName} ${TEMP_DIR}`;
  try {
    await async.exec(command);
    command = `$EDITOR ${TEMP_DIR}`;
    await async.exec(command);
  } catch (err) {
    logger(`unable to execute ${command}`, "error")();
    logger(err, "error")();
  }
})();
