# Pushit

*Usage*:
	pushit [options] [value]

**Options**:
	-m: This option is preceded by the commit message.
	-n: CR number.
	-p: git pull: Fetch from and integrate with another repository or a local branch.
	-b: Which branch to use. If this option does not be called, the current branch will be used.

Pushit Option:
	-h: Show this help message and quit

Description:
	The pushit command is a shortcut for the git commands.
	Its the junction of "git add -A && git commit -m [message] && git pull origin [branch] && git push origin [branch]"

Example:
	pushit -n 1532 -m 'Adjustments to the search method in productDAO'