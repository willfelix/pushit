#! /usr/bin/env node

const program = require('commander');
const exec = require('child_process').exec;
const chalk = require('chalk');

program
  .version('0.0.1')
  .description('The pushit command is a shortcut for the git commands')

program
  .option('-m, --message [commit]', '', 'att')
  .option('-b, --branch [branch]', '', 'current')
  .option('-n, --number <number>', '')
  .option('-q, --quit <message>', '')
  .option('-o, --origin <server>', '')
  .option('-t, --time <time>', '')
  .option('-d, --date <date>', '')
  .option('-f, --fetch', '')

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

  if (program.fetch) {
    exec('git status', function(err, stdout, stderr) {
      console.log(stdout);
    });
  }

  if (program.message) {
    console.log(program.message);
  }

}());
