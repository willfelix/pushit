#! /usr/bin/env node

const program = require('commander');
const exec = require('child_process').exec;
const chalk = require('chalk');
const pit = "git add -A; git commit -m '${message}'; git ${cmd} ${server} ${branch};";
var current_branch = "master";
var current_server = "origin";
var current_message = "att";

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
  .command('message [message]')
  .alias('m')
  .action(function (message) {

    my_config(function(origin, master) {
      var server = origin || "origin";
      var branch = master || "master";
      default_exec(pit.replace("${message}", message)
                      .replace("${cmd}", "pull")
                      .replace("${server}", server)
                      .replace("${branch}", branch) + " git push " + server + " " + branch);
    });

  });

program
  .command('pull [server] [branch]')
  .alias('p')
  .action(function (server, branch) {

    my_config(function(origin, master) {
      server = server || origin;
      branch = branch || master;
      default_exec(pit.replace("${message}", current_message)
                      .replace("${cmd}", "pull")
                      .replace("${server}", server)
                      .replace("${branch}", branch));
    });

  });

program
  .command('push [server] [branch]')
  .alias('ps')
  .action(function (server, branch) {

    my_config(function(origin, master) {
      server = server || origin;
      branch = branch || master;
      default_exec(pit.replace("${message}", current_message)
                      .replace("${cmd}", "push")
                      .replace("${server}", server)
                      .replace("${branch}", branch));
    });

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
  if (program.origin) {
    current_server = program.origin;
  }
  if (program.branch) {
    current_branch = program.branch;
  }
  if (program.message) {
    current_message = program.message;
  }

  my_config(function(server, branch) {
    if (!program.branch) {
      current_branch = program.branch || branch;
      current_branch = current_branch.replace("\n", "");
    }
  });

}());


function default_exec(cmd) {
  console.info(chalk.bgBlue("Info: " + cmd + "\n"));

  exec(cmd, function(err, stdout, stderr) {
    console.log(stdout);
    if (stderr) console.error(chalk.yellow(stderr));
  });
}

function my_config(callback) {

  exec("git branch | grep '* ' | sed -e 's/* //g'", function(err, stdout, stderr) {
    var branch = "master";
    if (!program.branch) {
      branch = stdout || branch;
      branch = branch.replace("\n", "");
    }

    var server = current_server || "origin";
    callback(server, branch);
  });

}
