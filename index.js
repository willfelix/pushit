#! /usr/bin/env node

const program = require('commander');
const exec = require('child_process').exec;
const chalk = require('chalk');

program
  .version('0.0.1')
  .description('The pushit command is a shortcut for the git commands')

program
  .option('-m, --message [commit]', '')
  .option('-b, --branch [branch]', '')
  .option('-n, --number <number>', '')
  .option('-q, --quit <message>', '')
  .option('-o, --origin <server>', '')
  .option('-t, --time <time>', '')
  .option('-d, --date <date>', '')
  .option('-f, --fetch', '')
  .option('-s, --status', '')

program
  .command('pull <server> <branch>')
  .action(function (server, branch) {

  });

program
  .command('push <server> <branch>')
  .action(function (server, branch) {

  });

program.parse(process.argv);


/**
* INIT FLAGS
*/
(function(){

  var current_branch;
  exec("git branch | grep -Ei '\*'", function(err, stdout, stderr){
    current_branch = stdout;
  });
  
  console.log(current_branch);

  if (program.status) {
    default_exec('git status');
  }

  if (program.fetch) {
    default_exec('git fetch');
  }

  if (program.message) {
    var msg = program.message || 'att';
    var cmd = "git add -A && git commit -m '" + msg + "' && git pull origin master && git push origin master";
    default_exec(cmd);
  }

}());


function default_exec(cmd) {
  console.info(cmd);
  exec(cmd, function(err, stdout, stderr) {
    if (err)
      console.error(chalk.red(err));

    if (stderr)
      console.error(chalk.yellow(stderr));

    console.log(stdout);
  });
}
