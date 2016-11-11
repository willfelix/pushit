curl https://raw.githubusercontent.com/WillFelix/Pushit/master/bin/pushit > pushit
sudo mv pushit /usr/local/bin/
sudo chmod 777 /usr/local/bin/pushit

get_alias(){
	echo $(grep "^alias pit=.*" $HOME/.bash_profile | sed -e 's/alias pit=//g')
}

alias=$( get_alias )
if [ "$alias" == "" ]; then

	echo "alias pit='pushit'" >> ~/.bash_profile
	if [ -e ~/.zshrc ]; then
		echo "alias pit='pushit'" >> ~/.zshrc
	fi

	alias pit='pushit'

fi

echo " ________________________________________ "
echo "< Pushit has been installed successfully >"
echo " ---------------------------------------- "
echo "          \\"
echo "           \\"
echo "            \\          __---__"
echo "                    _-       /--______"
echo "               __--( /     \\ )XXXXXXXXXXX\\v."
echo "             .-XXX(   O   O  )XXXXXXXXXXXXXXX-"
echo "            /XXX(       U     )        XXXXXXX\\"
echo "          /XXXXX(              )--_  XXXXXXXXXXX\\"
echo "         /XXXXX/ (      O     )   XXXXXX   \\XXXXX\\"
echo "         XXXXX/   /            XXXXXX   \\__ \\XXXXX"
echo "         XXXXXX__/          XXXXXX         \\__---->"
echo " ---___  XXX__/          XXXXXX      \\__         /"
echo "   \\-  --__/   ___/\\  XXXXXX            /  ___--/="
echo "    \\-\\    ___/    XXXXXX              '--- XXXXXX"
echo "       \\-\\/XXX\\ XXXXXX                      /XXXXX"
echo "         \\XXXXXXXXX   \\                    /XXXXX/"
echo "          \\XXXXXX      >                 _/XXXXX/"
echo "            \\XXXXX--__/              __-- XXXX/"
echo "             -XXXXXXXX---------------  XXXXXX-"
echo "                \\XXXXXXXXXXXXXXXXXXXXXXXXXX/"
echo "                  ""VXXXXXXXXXXXXXXXXXXV"""
echo ""
echo ""
