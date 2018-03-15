const { exec } = require('child_process');
const chalk = require('chalk');

module.exports = {

	default_exec: (cmd, callback) => {
		exec(`${cmd}`, {  }, (err, stdout, stderr) => {
			if (typeof callback === 'function') {
				callback(stdout);
				return;
			}

			let is4Log = true;
			if (typeof callback === 'boolean') {
				is4Log = callback;
			}


			if (stderr) process.stderr.write("Error: " + stderr);
			else if (is4Log) console.info(chalk.bgBlue("Info: " + cmd + "\n"));

			process.stdout.write(stdout);
		});
	}

}
