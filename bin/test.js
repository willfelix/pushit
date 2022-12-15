const { spawn } = require("child_process");
const chalk = require("chalk");

// git branch | grep '* ' | sed -e 's/* //g'
const cmd = "git branch | grep '* ' | sed -e 's/* //g'";
const workerProcess = spawn(cmd, { shell: true });

workerProcess.stdout.on("data", (data) => {
  console.info(chalk.bgBlue("\nCommand:\n-> " + cmd + "\n"));
  console.log(data.toString());
});

workerProcess.stderr.on("data", (data) => {
  console.error(chalk.bgRed(data));
});

workerProcess.on("close", function (code) {
  console.log("\n\nFatality!!!");
});
