const REFERENCE = "PUSHIT_GITLAB_API_TOKEN";
const BASE_URL = "https://gitlab.example.com/api/v4/";

const default_exec = require('../tools/default_exec').default_exec;
const questions = require('questions');
const chalk = require('chalk');
const fs = require('fs');

const gitlab = {
		init: () => {

			gitlab.get_token((token) => {
				if (!token) {
					questions.askOne({ info: 'Gitlab API TOKEN is missing. Do you wanna set it up now? [y|n]' }, (red) => {
						if (red == "y" || red == "Y") gitlab.config();
						console.info("\n");
					});
				}
			});

		},
		config: () => {

			console.log(chalk.bgBlue("\nCreating a personal access token\n"));
			console.log("1. Log in to your GitLab account.");
			console.log("2. Go to your Profile settings.");
			console.log("3. Go to Access tokens.");
			console.log("4. Choose a name and optionally an expiry date for the token.");
			console.log("5. Choose the desired scopes.");
			console.log("6. Click on Create personal access token.");
			console.log("7. Save the personal access token somewhere safe. Once you leave or refresh the page, you won't be able to access it again.\n");

			questions.askMany({
				input_token: { info: 'Insert your token here' },
			}, (result) => {

				let { input_token } = result;

				gitlab.get_token((my_token) => {
					if (my_token) {

						let cmd = 'sed -i "" `s/${REFERENCE}=${my_token}/${REFERENCE}=${input_token}/g` $HOME/.bash_profile';
						default_exec(cmd, false);

					} else {

						default_exec("echo `export ${REFERENCE}=${input_token}` >> $HOME/.bash_profile", false);
						fs.exists('$HOME/.zshrc', (exists) => {
							if (exists) {
								default_exec("echo `export ${REFERENCE}=${input_token}` >> $HOME/.zshrc", false);
							}
						});

					}

					let msg = "\nOK dude. Now you can update any issue passing the CR number by the pushit.";
					console.info(chalk.bgBlue(msg));
				});

			});

		},
		get_token: (callback) => {

			let cmd = `grep "^export ${REFERENCE}=.*" $HOME/.bash_profile | sed -e 's/export ${REFERENCE}=//g'`;
			default_exec(cmd, callback);

		},
		push: () => {

			gitlab.get_token((token) => {
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
};

gitlab.init();
