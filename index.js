#! /usr/bin/env node

const program = require('commander');
const exec = require('child_process').exec;
const chalk = require('chalk');
const pit = "git add -A; git commit -m '${message}'; git ${cmd} ${server} ${branch};";
var current_branch = "master";
var current_server = "origin";

program
  .version('0.0.1')
  .description('The pushit command is a shortcut for the git commands')

program
  .option('-m, --message [message]', '', "att")
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
  .command('commit [message]')
  .alias('m')
  .action(function (message) {

    init(function(origin, master) {
      default_exec(pit.replace("${message}", message)
                      .replace("${cmd}", "pull")
                      .replace("${server}", origin)
                      .replace("${branch}", master) + " git push " + origin + " " + master);
    });

  });

program
  .command('pull [server] [branch]')
  .alias('p')
  .action(function (server, branch) {

    init(function(origin, master) {
      server = server || origin;
      branch = branch || master;
      default_exec(pit.replace("${message}", program.message)
                      .replace("${cmd}", "pull")
                      .replace("${server}", server)
                      .replace("${branch}", branch));
    });

  });

program
	.command('push [server] [branch]')
	.alias('ps')
	.action((server, branch) => {
		init((origin, master) => {
			server = server || origin;
			branch = branch || master;
			default_exec(pit.replace("${message}", program.message)
				.replace("${cmd}", "push")
				.replace("${server}", server)
				.replace("${branch}", branch));
		});
	});

program
	.command('*')
	.action((env) => {
    	console.log(chalk.bgRed('Pushit: command "' + env + '" not found\n'));
  	});

program.parse(process.argv);


/**
* INIT FLAGS
*/

init((server, branch) => current_branch = (program.branch || branch).replace("\n", ""));

function default_exec(cmd) {
	console.info(chalk.bgBlue("Info: " + cmd + "\n"));
	exec(cmd, (err, stdout, stderr) => {
		console.info(stdout);
		if (stderr) console.error(chalk.yellow(stderr));
	});
}

function init(callback) {
	exec("git branch | grep '* ' | sed -e 's/* //g'", (err, stdout, stderr) => {
		var branch = "master";
		if (!program.branch) {
			branch = stdout || branch;
			branch = branch.replace("\n", "");
		}

		var server = current_server || "origin";
		callback(server, branch);
	});
}
