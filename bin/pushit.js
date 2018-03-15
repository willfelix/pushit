#! /usr/bin/env node

const program = require('commander');
const exec = require('child_process').exec;
const chalk = require('chalk');
const pit = "git add -A; git commit -m '${message}'; git ${cmd} ${server} ${branch};";


// Init config variables
let current_branch, current_server;
(function () {
	exec("git branch | grep '* ' | sed -e 's/* //g'", (err, stdout, stderr) => {
		current_branch = (stdout || "master").replace("\n", "");
		current_server = (program.origin || "origin").replace("\n", "");;

		processOptions();
	});
})();



program
	.version('0.0.1', '-v, --version')
	.description('The pushit command is a shortcut for the git commands');

program
	.command('redmine [name]', "vamo ver oq vai fazer")
	.command('*').action((env) => console.log(chalk.bgRed('Pushit: command "' + env + '" not found\n')));

program
	.option('-o, --origin <server>', '')
	.option('-m, --message <message>', '')
	.option('-s, --status', '')
	.option('-f, --fetch', '')
	.option('-l, --log', '')
	.option('-p, --pull', '');

program.parse(process.argv);



function processOptions() {
	// Origin
	if (program.origin) {
		current_server = program.origin;
	}

	// Commit and Push
	if (program.message) {
		let msg = pit.replace("${message}", program.message)
					.replace("${cmd}", "pull")
					.replace("${server}", current_server)
					.replace("${branch}", current_branch) + " git push " + current_server + " " + current_branch;

		default_exec(msg);
	}

	// Status
	if (program.status) {
		default_exec('git status');
	}

	// Fetch
	if (program.fetch) {
		default_exec('git fetch');
	}

	// Log
	if (program.log) {
		default_exec('git log');
	}

	// Pull
	if (program.pull) {
		default_exec(`git pull ${current_server} ${current_branch}`);
	}
}

function default_exec(cmd) {
	console.info(chalk.bgBlue("Info: " + cmd + "\n"));

	exec(cmd, (err, stdout, stderr) => {
		console.info(stdout);
		if (stderr) console.error(chalk.yellow(stderr));
	});
}
