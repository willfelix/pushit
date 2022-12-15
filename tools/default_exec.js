const { exec, spawn } = require("child_process");
const chalk = require("chalk");

module.exports = {
  default_exec: (cmd, callback) => {
    // exec(`${cmd}`, {}, (err, stdout, stderr) => {
    //   if (typeof callback === "function") {
    //     callback(stdout);
    //     return;
    //   }

    //   let is4Log = true;
    //   if (typeof callback === "boolean") {
    //     is4Log = callback;
    //   }

    //   // if (stderr) process.stderr.write("Error: " + stderr);
    //   // else
    //   if (is4Log) console.info(chalk.bgBlue("\nCommand:\n-> " + cmd + "\n"));

    //   if (stdout) console.log(stdout);
    // });

    const workerProcess = spawn(cmd, { shell: true });

    workerProcess.stdout.on("data", (data) => {
      if (typeof callback === "function") {
        callback(data.toString());
        return;
      }

      let is4Log = true;
      if (typeof callback === "boolean") {
        is4Log = callback;
      }

      if (is4Log) console.info(chalk.bgBlue("\nCommand:\n-> " + cmd + "\n"));

      console.log(data.toString());
    });

    workerProcess.stderr.on("data", (data) => {
      console.error(chalk.bgRed(data.toString()));
    });
  },
};
