const exec = require('child_process').exec;
const prompt = require('prompt');
const path = require('path');

function get_redmine_token(){
	let cmd = `grep "^export REDMINE_API_TOKEN=.*" $HOME/.bash_profile | sed -e 's/export REDMINE_API_TOKEN=//g'`;
	default_exec(cmd);
}

function config_redmine(){
	console.info("You can find your API key on yseour account page ( /my/account ) when logged in.\n");
	prompt.start();
	prompt.get('token', (err, result) => {
	    console.log('Token: ' + result.token);
		let my_token = get_redmine_token();
		let input_token = result.token;

		if (my_token) {

			let cmd = 'sed -i "" `s/REDMINE_API_TOKEN=${my_token}/REDMINE_API_TOKEN=${input_token}/g` $HOME/.bash_profile';
			default_exec(cmd);

		} else {

			default_exec("echo `export REDMINE_API_TOKEN=${input_token}` >> ~/.bash_profile");
			path.exists('~/.zshrc', (exists) => {
				if (exists) {
					default_exec("echo `export REDMINE_API_TOKEN=${input_token}` >> ~/.zshrc");
				}
			});

		}
	});

	console.info("OK dude. Now you can update any issue passing the CR number by the pushit");
}

function init_redmine() {
	let token = get_redmine_token();
	if (!token) {

		prompt.start();
		prompt.get('token', (err, result) => {
		read -p "Redmine API TOKEN is missing. Do you wanna set it up now? [y|N] " red
		if [ "$red" == "y" ] || [ "$red" == "Y" ] {
			config_redmine();
		}

		console.info("\n");
	}
}

// function redmine_push() {
// 	init_redmine
//
// 	token=$( get_redmine_token )
// 	number=$1
// 	status=2
// 	note=''
//  	if [ "$2" != "" ]; then
// 		status=32
// 		note="$2"
// 	fi
// 	curl -v -H "Content-Type: application/json" -X PUT -d "{ \"issue\": { \"id\": \"$number\", \"status_id\": \"$status\", \"notes\": \"$note\" } }" -H "X-Redmine-API-Key: $token" http://suporte.cers.com.br/issues/$number.json
// }
//
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



function default_exec(cmd) {
	console.info(chalk.bgBlue("Info: " + cmd + "\n"));

	exec(cmd, (err, stdout, stderr) => {
		console.info(stdout);
		if (stderr) console.error(chalk.yellow(stderr));
	});
}
