#! /usr/bin/env node

const chalk = require("chalk");
const program = require("commander");
const questions = require("questions");
const default_exec = require("../tools/default_exec").default_exec;
const pit =
  "git add -A; git commit -m '${message}'; git ${cmd} ${server} ${branch};";

// Init config variables
let current_branch, current_server;
(function () {
  default_exec("git branch | grep '* ' | sed -e 's/* //g'", (stdout) => {
    current_branch = (stdout || "master").replace("\n", "");
    current_server = (program.origin || "origin").replace("\n", "");

    processOptions();
  });
})();

program
  .version("0.0.1", "-v, --version")
  .description("The pushit command is a shortcut for the git commands");

program
  .command("redmine", "redmine plugin integration")
  .command("github", "github plugin integration")
  .command("gitlab", "gitlab plugin integration")
  .command("*")
  .action((env) =>
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
    default_exec("git status");
  }

  // Fetch
  if (program.fetch) {
    default_exec("git fetch");
  }

  // Log
  if (program.log) {
    default_exec("git log");
  }

  // Diff
  if (program.diff) {
    default_exec("git diff");
  }

  // Pull
  if (program.pull) {
    default_exec(`git pull ${current_server} ${current_branch}`);
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
            " git push " +
            current_server +
            " " +
            current_branch;

          default_exec(msg);
        }
      }
    );
  }
}
