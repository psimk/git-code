import * as cp from "child_process";
import spinner from "./spinner";

const exec = (command: string): Promise<string> =>
  new Promise((resolve, reject) => {
    spinner.spin(command);
    cp.exec(command, (err, stdout, stderr) => {
      if (err) return reject(err);

      return resolve(stdout);
    });
  });

export default { exec };
