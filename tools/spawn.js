const { exec, spawn } = require("node:child_process");
const chalk = require("chalk");

module.exports = {
  main,
};

const STDIO_PIPE = "pipe";
const STDIO_INHERIT = "inherit";

async function main(cmd, options = {}) {
  const defaultParameters = {
    log: true,
    split: true,
  };

  options = {
    ...defaultParameters,
    ...options,
  };

  const params = {
    stdio: options.split ? STDIO_INHERIT : STDIO_PIPE,
    log: options.log,
  };

  if (!options.split) {
    const result = await run(cmd, params);
    return result;
  }

  const commands = cmd
    .replace(/&&/g, ";")
    .split(";")
    .map((cmd) => cmd.trim());

  for (const command of commands) {
    try {
      await run(command, params);
    } catch (error) {
      if (options.log) fatality();
      break;
    }
  }
}

function run(command, options = { stdio: STDIO_INHERIT, log: true }) {
  return new Promise((resolve, reject) => {
    if (options.log) console.info(chalk.bgBlue("\n-> " + command + "\n"));

    const workerProcess = spawn(command, {
      stdio: options.stdio,
      shell: true,
    });

    let result = "";
    if (options.stdio === STDIO_PIPE) {
      workerProcess.stdout.on("data", (data) => {
        result += data;
      });
    }

    workerProcess.on("exit", (code) => {
      exec("sleep 1", () => {
        code != 0 ? reject() : resolve(result);
      });
    });
  });
}

function fatality() {
  console.info(chalk.bgMagenta("\n\nFatality!!!\n"));
  exec("say 'fa..tality'");
}
