const default_exec = require('../tools/default_exec').default_exec;
const questions = require('questions');
const chalk = require('chalk');
const fs = require('fs');

function get_redmine_token(callback){
	let cmd = `grep "^export REDMINE_API_TOKEN=.*" $HOME/.bash_profile | sed -e 's/export REDMINE_API_TOKEN=//g'`;
	default_exec(cmd, callback);
}

function config_redmine(){
	console.info("\nYou can find your API key on your account page ( /my/account ) when logged in.");
	questions.askMany({
		url: { info: 'Insert the redmine URL here' },
		input_token: { info: 'Insert your redmine token here' },
	}, (result) => {

		let { url, input_token } = result;

		get_redmine_token((my_token) => {
			if (my_token) {

				let cmd = 'sed -i "" `s/REDMINE_API_TOKEN=${my_token}/REDMINE_API_TOKEN=${input_token}/g` $HOME/.bash_profile';
				default_exec(cmd, false);

			} else {

				default_exec("echo `export REDMINE_API_TOKEN=${input_token}` >> $HOME/.bash_profile", false);
				fs.exists('$HOME/.zshrc', (exists) => {
					if (exists) {
						default_exec("echo `export REDMINE_API_TOKEN=${input_token}` >> $HOME/.zshrc", false);
					}
				});

			}

			let msg = "\nOK dude. Now you can update any issue passing the CR number by the pushit.";
			console.info(chalk.bgBlue(msg));
		});

	});
}

function init_redmine() {
	get_redmine_token((token) => {
		if (!token) {
			questions.askOne({ info: 'Redmine API TOKEN is missing. Do you wanna set it up now? [y|n]' }, (red) => {
				if (red == "y" || red == "Y") config_redmine();
				console.info("\n");
			});
		}
	});
}

function redmine_push() {
	get_redmine_token((token) => {
		let number = $1;
		let status = 2;
		let note = '';
	 	if ("$2" != "") {
			status = 32;
			note = "$2";
		}

		curl(`http://suporte.cers.com.br/issues/${number}.json`, {
			HTTPHEADERS: {
				"Content-Type": "application/json",
				"X-Redmine-API-Key": token
			},
			POSTFIELDS: { issue: { id: number, status_id: status, notes: note } },
			PUT: true
		});
	});
}

// function redmine_time_entry() {
// 	init_redmine
//
// 	token=$( get_redmine_token )
// 	number=$1
// 	hours=$2
// 	startDate=$3
//
// 	if [ "$number" == "" ] || [ "$hours" == "" ]; then
// 		printf "issue_id (required)\nhours (required)\n\n"
// 		exit 1;
// 	fi;
//
// 	xml="<time_entry><issue_id>$number</issue_id><hours>$hours</hours><activity_id>16</activity_id></time_entry>"
// 	if [ "$startDate" != "" ]; then
// 		xml="<time_entry><issue_id>$number</issue_id><hours>$hours</hours><spent_on>$startDate</spent_on><activity_id>16</activity_id></time_entry>"
// 	fi;
//
// 	curl -v -H "Content-Type: application/xml" -X POST -d "$xml" -H "X-Redmine-API-Key: $token" http://suporte.cers.com.br/time_entries.xml
// }
