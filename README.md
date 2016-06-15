# Pushit

**Usage**:<br />
	*pushit [options] [value]*

**Options**:<br />
	-m: *This option is preceded by the commit message.*<br />
	-n: *CR number.*<br />
	-p: *git pull: Fetch from and integrate with another repository or a local branch.*<br />
	-b: *Which branch to use. If this option does not be called, the current branch will be used.*<br />
<br />
**Pushit Option**:<br />
	-h: *Show this help message and quit*<br />
<br />
**Description**:<br />
	*The pushit command is a shortcut for the git commands.*<br />
	*Its the junction of "git add -A && git commit -m [message] && git pull origin [branch] && git push origin [branch]"*<br />
<br />
**Example**:<br />
	*pushit -n 1532 -m 'Adjustments to the search method in productDAO'*<br />

---

### Prerequisites

* Unix-based operating system (OS X or Linux)
* `curl` or `wget` should be installed
* `git` should be installed

### Basic Installation

Pushit is installed by running one of the following commands in your terminal. You can install this via the command-line with either `curl` or `wget`.

#### via curl

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/willfelix/Pushit/master/tools/install.sh)"
```

#### via wget

```shell
sh -c "$(wget https://raw.githubusercontent.com/willfelix/Pushit/master/tools/install.sh -O -)"
