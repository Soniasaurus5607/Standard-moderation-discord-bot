# Standard-moderation-discord-bot
A script in javascript that brings your bot to life, adding commands like mute, kick, ban etc...

**How to set it up?**

**1. Installing node on your WINDOWS pc** \
open your command prompt by hitting WIN+R on your keyboard and writing "cmd" and press OK. In  the windows that just opened you have to
write _node -v_. If it spits out an error you have to install node by clicking this link https://nodejs.org/en .

**2. Creating our bot folder** \
open file explorer and create a bot folder where you want. open command prompt like i showed you before and navigate to
the folder by using the command _cd *insert folder here*_

**3. Setting up our folder**
Run these commands in the command prompt:

npm init -y \
npm install discord.js @discordjs/voice @distube/ytdl-core dotenv \
npm install luxon \
npm install node-fetch


**4.Creating our discord bot**

click on this link https://discord.com/developers/applications , log into your discord account. After you've done that you need to click the blue button
in the top right corner that says "New Application". Give it a name and agree to discord's TOS. In the left bar click on OAuth2. Scroll down until you
see multiple check boxes. Check the bot one, scroll down check the administrator one as well. Scroll down and copy the link you got and paste it in your browser. 
Invite your bot to your discord server. After you've done that, go in the bot tab, click reset token and copy it. Also scroll down and enable "message content intent" 
and "server members intent"

**5. Coding the discord bot**

Download the index.js file from this github page in your discord bot folder. Also download the .env file in your discord bot folder, and erase the "txt" at the end. Open it with notepad and replace "insert your bot token here" with the token you just copied.Dont forget to save it by clicking "Ctrl+S" 

**6. Editing the _Package.json_ file**

Open the _package.json_ file in notepad. paste this _"type": "module",_ under the _"version": "1.0.0",_. Dont forget to save it by clicking "Ctrl+S"

**7. Running the bot** \
Open command prompt how i explained previously and navigate to your folder. Run the command "node index.js" and after 2-3 seconds you should see
"Logged in as _your bot#1234_"

**8. Exploring the bot** \
Run the !help command to see what commands there are


**HOPE YOU ENJOY IT ❤️**
