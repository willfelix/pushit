sudo rm /usr/local/bin/pushit

get_alias(){
	echo $(grep "^alias pit=.*" $HOME/.bash_profile | sed -e 's/alias pit=//g')
}

alias=$( get_alias )
if [ "$alias" != "" ]; then
	sed -i "" "s/alias pit='pushit'//g" $HOME/.bash_profile
	if [ -e ~/.zshrc ]; then
		sed -i "" "s/alias pit='pushit'//g" $HOME/.zshrc
	fi
fi

echo ""
echo " ____________________ "
echo "< Pushit has gone ;( >"
echo " -------------------- "
echo "        \\   ^__^"
echo "         \\  (oo)\\_______"
echo "            (__)\\       )\\/\\"
echo "                ||----w |"
echo "                ||     ||"
echo ""
echo ""
