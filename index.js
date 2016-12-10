#! /usr/bin/env node

const program = require('commander');
const exec = require('child_process').exec;
const chalk = require('chalk');

program
  .version('0.0.1')
  .description('The pushit command is a shortcut for the git commands')

program
  .option('-m, --message [commit]', '')
  .option('-o, --origin <server>', '')

  .option('-n, --number <number>', '')
  .option('-c, --close <message>', '')
  .option('-t, --time <time>', '')
  .option('-d, --date <date>', '')

program
  .command('branch [branch]')
  .alias('b')
  .option('-f, --force', 'Force command to execute')
  .action(function (branch, option) {
    if (branch) {
      var cmd = 'git checkout ' + branch;
      if (option.force) {
        cmd = 'git checkout -b ' + branch;
      }

      default_exec(cmd);
    } else {
      default_exec('git branch');
    }
  });

program
  .command('status')
  .alias('s')
  .action(function () {
    default_exec('git status');
  });

program
  .command('fetch')
  .alias('f')
  .action(function () {
    default_exec('git fetch');
  });

program
  .command('pull [server] [branch]')
  .alias('p')
  .action(function (server, branch) {

    my_config(function(origin, master) {
      server = server || origin;
      branch = branch || master;
      default_exec('git add -A && git commit -m "Merge" || git pull ' + server + ' ' + branch);
    });

  });

program
  .command('push [server] [branch]')
  .alias('ps')
  .action(function (server, branch) {
    server = server || "origin";
    branch = branch || "master";
    default_exec('git add -A && git commit -m "Merge" || git push ' + server + ' ' + branch);
  });

program
  .command('*')
  .action(function(env){
    console.log(chalk.bgRed('Pushit: command "' + env + '" not found\n'));
  });

program.parse(process.argv);


/**
* INIT FLAGS
*/
(function(){
  if (program.status) {
    default_exec('git status');
    return;
  } else if (program.fetch) {
    default_exec('git fetch');
    return;
  }

  var current_server = "origin";
  if (program.origin) {
    current_server = program.origin;
  }

  var current_branch = "master";
  if (program.branch) {
    current_branch = program.branch;
  }

  exec("git branch | grep '* ' | sed -e 's/* //g'", function(err, stdout, stderr) {
    if (!program.branch) {
      current_branch = stdout || current_branch;
      current_branch = current_branch.replace("\n", "");
    }

    if (program.message) {
      var msg = program.message || 'att';
      var cmd = " git add -A && git commit -m '" + msg + "' && git pull " + current_server + " " + current_branch + " && git push " + current_server + " " + current_branch;
      default_exec(cmd);
    }

  });

}());


function default_exec(cmd) {
  console.info(chalk.bgBlue("Info: " + cmd + "\n"));

  exec(cmd, function(err, stdout, stderr) {
    if (stderr) console.error(chalk.red(stderr));
    console.log(stdout);
  });
}

function my_config(callback) {

  exec("git branch | grep '* ' | sed -e 's/* //g'", function(err, stdout, stderr) {
    var current_branch = "master";
    if (!program.branch) {
      current_branch = stdout || current_branch;
      current_branch = current_branch.replace("\n", "");
    }

    callback("origin", current_branch);
  });

}
