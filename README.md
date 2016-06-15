# Pushit

**Usage**:<br />
	*pushit [options] [value]*

**Options**:<br />
	-m: This option is preceded by the commit message.<br />
	-n: CR number.<br />
	-p: git pull: Fetch from and integrate with another repository or a local branch.<br />
	-b: Which branch to use. If this option does not be called, the current branch will be used.<br />
<br />
**Pushit Option**:<br />
	-h: Show this help message and quit<br />
<br />
**Description**:<br />
	The pushit command is a shortcut for the git commands.<br />
	Its the junction of "git add -A && git commit -m [message] && git pull origin [branch] && git push origin [branch]"<br />
<br />
**Example**:<br />
	pushit -n 1532 -m 'Adjustments to the search method in productDAO'<br />
