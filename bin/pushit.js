#! /usr/bin/env node

const chalk = require("chalk");
const program = require("commander");
const questions = require("questions");
const spawn = require("../tools/spawn").main;
const pit =
  "git add -A && git commit -m '${message}' && git ${cmd} ${server} ${branch};";

// Init config variables
let current_branch, current_server;
(async function () {
  const get_current_branch = "git branch | grep '* ' | sed -e 's/* //g'";
  const result = await spawn(get_current_branch, {
    log: false,
    split: false,
  });
  current_branch = (result || "main").replace("\n", "");
  current_server = (program.origin || "origin").replace("\n", "");

  processOptions();
})();

program
  .version("1.0.4", "-v, --version")
  .description("The pushit command is a shortcut for the git commands");

program
  .command("redmine", "redmine plugin integration")
  .command("github", "github plugin integration")
  .command("gitlab", "gitlab plugin integration");

program.action((env) =>
  console.log(chalk.bgRed('Pushit: command "' + env + '" not found\n'))
);

program
  .option("-o, --origin <server>", "")
  .option("-m, --message <message>", "")
  .option("-s, --status", "")
  .option("-f, --fetch", "")
  .option("-l, --log", "")
  .option("-d, --diff", "")
  .option("-p, --pull", "");

program.parse(process.argv);

function processOptions() {
  // Origin
  if (program.origin) {
    current_server = program.origin;
  }

  // Status
  if (program.status) {
    spawn("git status");
  }

  // Fetch
  if (program.fetch) {
    spawn("git fetch");
  }

  // Log
  if (program.log) {
    spawn("git log");
  }

  // Diff
  if (program.diff) {
    spawn("git diff");
  }

  // Pull
  if (program.pull) {
    spawn(`git pull ${current_server} ${current_branch}`);
  }

  // Commit and Push
  if (program.message) {
    console.log(`\n:: Commit: ${program.message}`);
    console.log(`:: Branch: ${current_branch}\n`);
    questions.askOne(
      { info: "Do you want continue? [y|N]", required: false },
      (red) => {
        if (red == "y" || red == "Y") {
          let msg =
            pit
              .replace("${message}", program.message)
              .replace("${cmd}", "pull")
              .replace("${server}", current_server)
              .replace("${branch}", current_branch) +
            ` git push ${current_server} ${current_branch}`;

          spawn(msg);
        }
      }
    );
  }
}
