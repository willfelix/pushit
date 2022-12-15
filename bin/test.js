const { exec, spawn } = require("node:child_process");
const chalk = require("chalk");

main();

async function main() {
  const cmd =
    "git add -A && git commit -m 'test' && git pull origin main; git push origin main";
  const commands = cmd
    .replace(/&&/g, ";")
    .split(";")
    .map((cmd) => cmd.trim());
  for (const command of commands) {
    await run(command);
  }
}

function run(command) {
  return new Promise((resolve) => {
    const workerProcess = spawn(command, { shell: true, stdio: "inherit" });
    console.info(chalk.bgBlue("\n-> " + command + "\n"));

    workerProcess.on("exit", () => {
      exec("sleep 1", () => resolve("\n\nFatality!!!"));
    });
  });
}
