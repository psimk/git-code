import async from "./async";
import { Command } from "commander";
import * as packageJson from "../package.json";
import * as cp from "child_process";
import { v4 as uuid } from "uuid";
import chalk from "chalk";
import { tmpdir } from "os";
import spinner from "./spinner";

const COMMANDS = {
  check: "git --version",
  clone: "git clone"
};

const GITHUB_WEBSITE = "https://github.com";
const TEMP_DIR = `${tmpdir}${uuid()}`;
const EDITOR = `$EDITOR`;

const logger = (message: string, type: "log" | "info" | "error") => (
  ...args: any[]
) => console[type](...args, message);

(async () => {
  let repoName: string;

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

  repoName = repoName.trim();

  const command = `${COMMANDS.clone} ${GITHUB_WEBSITE}/${repoName} ${TEMP_DIR}`;
  let editor = EDITOR;

  try {
    await async.exec(command);
    editor = (await async.exec(`echo ${editor}`)).trim();
  } catch (err) {
    logger(`unable to execute ${command}`, "error")();
    logger(err, "error")();
  }

  spinner.end();
  cp.spawn(editor, [TEMP_DIR], { stdio: "inherit" });
})();
