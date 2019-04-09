import * as cp from "child_process";

const exec = (command: string): Promise<string> =>
  new Promise((resolve, reject) => {
    cp.exec(command, (err, stdout, stderr) => {
      if (err) return reject(err);

      return resolve(stdout);
    });
  });

export default { exec };
