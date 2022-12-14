# Pushit
The pushit command is a shortcut for the git commands and some extras features like redmine integration.<br />
Its the junction of "git add -A && git commit -m [message] && git pull origin [branch] && git push origin [branch]"

<br/>

## Prerequisites

* Unix-based operating system (OS X or Linux)
* `git` should be installed
* [`npm`](https://curl.haxx.se/download.html)

<br/>

## Installing

Pushit is installed using npm command.

```shell
npm install -g pushit
```

<br/>

## Usage
*pushit|pit [options] [value]*

#### Options:
-m: *This option is preceded by the commit message.*<br />
-n: *Redmine CR number.*<br />
-b: *git checkout. If this option does not be called, the current branch will be used.*<br />
-q: *Close the issue specified by the CR number (Redmine).*<br />

#### Flags:
-h: *Show this help message and quit*<br />
-v: *Pushit's version*<br />
-p: *git pull: Fetch from and integrate with another repository or a local branch.*<br />
-s: *git status: The same as git status.*<br />

#### Commands:
redmine: *redmine config: This flag will initialize the Redmine config token.*<br />
gitlab: *gitlab config: [[ working in progress ]].*<br />
github: *github config: [[ working in progress ]].*<br />


<br />

## Example
```shell
$ pushit -n 1532 -m 'Adjustments to the search method in productDAO'
$ pit -v
```
