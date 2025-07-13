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
npm install luxon 

**4.Creating our discord bot**

click on this link https://discord.com/developers/applications , log into your discord account. After you've done that you need to click the blue button
in the top right corner that says "New Application". Give it a name and agree to discord's TOS. In the left bar click on OAuth2. Scroll down until you
see multiple check boxes. Check the bot one, scroll down and copy the link you just got. Paste that link in your browser and invite the bot into your discord server

