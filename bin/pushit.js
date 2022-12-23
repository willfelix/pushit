#! /usr/bin/env node

const chalk = require("chalk");
const program = require("commander");
const questions = require("questions");
const spawn = require("../tools/spawn").main;

let current_branch, current_server;
getCurrentBranchAndServer().then((result) => {
  current_branch = result.current_branch;
  current_server = result.current_server;

  processOptions();
});

program
  .version("1.0.5", "-v, --version")
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
    spawn(`git pull ${current_server} '${current_branch}'`);
  }

  // Commit and Push
  if (program.message) {
    console.log(`\n:: Commit: ${program.message}`);
    console.log(`:: Branch: ${current_branch}\n`);
    questions.askOne(
      { info: "Do you want continue? [y|N]", required: false },
      (red) => {
        if (red == "y" || red == "Y") {
          const pit = `
            git add -A &&
            git commit -m '${program.message}' &&
            git pull ${current_server} '${current_branch}';
            git push ${current_server} '${current_branch}'
          `;

          spawn(pit);
        }
      }
    );
  }
}

async function getCurrentBranchAndServer() {
  const get_current_branch_cmd = "git branch | grep '* ' | sed -e 's/* //g'";
  const result = await spawn(get_current_branch_cmd, {
    log: false,
    split: false,
  });

  const current_branch = (result || "main").replace("\n", "");
  const current_server = (program.origin || "origin").replace("\n", "");

  return {
    current_branch,
    current_server,
  };
}
