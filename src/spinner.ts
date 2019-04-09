import { Ora } from "ora";
import ora = require("ora");

const spinner = (() => {
  let spinner: Ora;

  return {
    spin: (text: string) => {
      if (!spinner) spinner = ora(text);
      if (!spinner.isSpinning) spinner.start();
      if (spinner.text !== text) spinner.text = text;
    },
    end: () => {
      if (spinner) spinner.stop();
    }
  };
})();

export default spinner;
