#! /usr/bin/env node

const program = require('commander');
const exec = require('child_process').exec;
const chalk = require('chalk');
const pit = "git add -A; git commit -m '${message}'; git ${cmd} ${server} ${branch};";
var current_branch = "master";
var current_server = "origin";

program
  .version('0.0.1')
  .description('The pushit command is a shortcut for the git commands');

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


// Pushit Options
program
	.option('-m, --message [message]', '', "att")
	.option('-o, --origin <server>', '')
	.option('-n, --number <number>', '')
	.option('-c, --close <message>', '')
	.option('-t, --time <time>', '')
	.option('-d, --date <date>', '')
	.parse(process.argv);

(function processOptions() {
	// Set origin server
	if (program.origin) {
		current_server = program.origin;
	}

	// Commit
	let hasMessage = process.argv.includes("-m") || process.argv.includes("--message");
	if (hasMessage) {
		let msg = pit.replace("${message}", program.message)
					.replace("${cmd}", "pull")
					.replace("${server}", current_server)
					.replace("${branch}", current_branch) + " git push " + current_server + " " + current_branch;

		default_exec(msg);
	}
})();

/**
* INIT FLAGS
*/

function default_exec(cmd) {
	console.info(chalk.bgBlue("Info: " + cmd + "\n"));

	exec(cmd, (err, stdout, stderr) => {
		console.info(stdout);
		if (stderr) console.error(chalk.yellow(stderr));
	});
}

(function () {
	exec("git branch | grep '* ' | sed -e 's/* //g'", (err, stdout, stderr) => {
		current_branch = (stdout || "master").replace("\n", "");
		current_server = (program.origin || "origin").replace("\n", "");;
	});
})();
