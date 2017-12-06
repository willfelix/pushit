# Pushit
The pushit command is a shortcut for the git commands and some extras features like redmine integration.<br />
Its the junction of "git add -A && git commit -m [message] && git pull origin [branch] && git push origin [branch]"


## Prerequisites

* Unix-based operating system (OS X or Linux)
* `git` should be installed
* [`curl`](https://curl.haxx.se/download.html) or [`wget`](http://gnuwin32.sourceforge.net/packages/wget.htm) should be installed

## Installing

Pushit is installed by running one of the following commands in your terminal. You can install this via the command-line with either `curl` or `wget`.

#### via curl

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/WillFelix/Pushit/master/tools/install.sh)"
```

#### via wget

```shell
sh -c "$(wget https://raw.githubusercontent.com/WillFelix/Pushit/master/tools/install.sh -O -)"
```

## Usage
*pushit|pit [options] [value]*

#### Options:
-m: *This option is preceded by the commit message.*<br />
-n: *CR number.*<br />
-b: *git checkout. If this option does not be called, the current branch will be used.*<br />
-q: *Close the issue specified by the CR number (Redmine).*<br />
<br />
#### Flags:
-h: *Show this help message and quit*<br />
-v: *Pushit's version*<br />
-r: *redmine config: This flag will initialize the Redmine config token.*<br />
-p: *git pull: Fetch from and integrate with another repository or a local branch.*<br />
-s: *git status: The same as git status.*<br />
<br />

## Example
*pushit -n 1532 -m 'Adjustments to the search method in productDAO'*<br />
