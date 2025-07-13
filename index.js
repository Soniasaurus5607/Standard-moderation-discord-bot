import { Client, GatewayIntentBits, Partials, EmbedBuilder } from 'discord.js'; // added EmbedBuilder
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { DateTime } from 'luxon';

dotenv.config();
const gameSessions = new Map(); // Stores active games: userId => number


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Channel],
});

// Utility function to find user by mention or username
async function findUser(message, input) {
  if (!input) return null;
  const mention = message.mentions.members.first();
  if (mention) return mention;
  const members = await message.guild.members.fetch();
  return members.find(m => m.user.username.toLowerCase() === input.toLowerCase());
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const [command, ...args] = message.content.trim().split(/\s+/);

  // !game - Starts a new game
if (command === '!game') {
  const number = Math.floor(Math.random() * 100) + 1;
  gameSessions.set(message.author.id, number);
  message.reply('I\'ve picked a number between 1 and 100. Try to guess it with !guess <number>!');
  return;
}

// !guess - Make a guess
else if (command === '!guess') {
  const guess = parseInt(args[0], 10);
  const target = gameSessions.get(message.author.id);

  if (!target) {
    message.reply('Start a game first by typing !game');
    return;
  }

  if (isNaN(guess) || guess < 1 || guess > 100) {
    message.reply('Please enter a valid number between 1 and 100.');
    return;
  }

  if (guess < target) {
    message.reply('Higher! 🔼');
  } else if (guess > target) {
    message.reply('Lower! 🔽');
  } else {
    message.reply('🎉 Correct! You guessed the number!');
    gameSessions.delete(message.author.id);
  }

  return;
}


  // !slay command
  if (command === '!slay') {
    message.reply('slay 😭');
    return;
  }

  // !time command
  else if (command === '!time') {
    const roTime = DateTime.now().setZone('Europe/Bucharest').toFormat('dd LLL yyyy, HH:mm:ss');
    const beTime = DateTime.now().setZone('Europe/Brussels').toFormat('dd LLL yyyy, HH:mm:ss');
    message.reply(`🇷🇴 Bucharest time: ${roTime}\n🇧🇪 Brussels time: ${beTime}`);
    return;
  }

  // !joke command
  else if (command === '!joke') {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
      const data = await response.json();
      message.reply(data.joke || 'Could not fetch a joke.');
    } catch {
      message.reply('Failed to fetch a joke.');
    }
    return;
  }

  // !dice command
  else if (command === '!dice') {
    const roll = Math.floor(Math.random() * 6) + 1;
    message.reply(`🎲 You rolled a ${roll}!`);
    return;
  }

  // !help command
  else if (command === '!help') {
    const embed = new EmbedBuilder()
      .setTitle('Bot Commands')
      .setColor(0x84fc03)
      .addFields(
        { name: '!slay', value: 'Replies with "slay 😭"' },
        { name: '!time', value: 'Shows current time in Romania 🇷🇴 and Belgium 🇧🇪' },
        { name: '!joke', value: 'Tells a random joke from the internet' },
        { name: '!dice', value: 'Rolls a six-sided dice 🎲' },
        { name: '!mute username', value: 'Mutes a user (owner only)' },
        { name: '!unmute username', value: 'Unmutes a user (owner only)' },
        { name: '!kick username', value: 'Kicks a user (owner only)' },
        { name: '!ban username', value: 'Bans a user (owner only)' },
        { name: '!unban username', value: 'Unbans a user (owner only)' },
        { name: '!game', value: 'Begins a guessing game' }
      )
      .setFooter({ text: 'Made with ❤️ by Sonia' });
    message.channel.send({ embeds: [embed] });
    return;
  }

 // !mute command (indefinite mute by adding "Muted" role)
else if (command === '!mute') {
  if (message.member.id !== message.guild.ownerId) 
    return message.reply('Only the server owner can mute users.');

  const target = await findUser(message, args[0]);
  if (!target) return message.reply('User not found.');

  const mutedRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');
  if (!mutedRole) return message.reply('Muted role not found. Please create a role named "Muted".');

  if (target.roles.cache.has(mutedRole.id)) {
    return message.reply(`${target.user.username} is already muted.`);
  }

  await target.roles.add(mutedRole);
  message.reply(`${target.user.username} has been muted indefinitely.`);
  return;
}

// !unmute command (remove "Muted" role)
else if (command === '!unmute') {
  if (message.member.id !== message.guild.ownerId)
    return message.reply('Only the server owner can unmute users.');

  const target = await findUser(message, args[0]);
  if (!target) return message.reply('User not found.');

  const mutedRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');
  if (!mutedRole) return message.reply('Muted role not found. Please create a role named "Muted".');

  if (!target.roles.cache.has(mutedRole.id)) {
    return message.reply(`${target.user.username} is not muted.`);
  }

  await target.roles.remove(mutedRole);
  message.reply(`${target.user.username} has been unmuted.`);
  return;
}


  // !kick command
  else if (command === '!kick') {
    if (message.member.id !== message.guild.ownerId) return message.reply('Only the server owner can kick users.');
    const target = await findUser(message, args[0]);
    if (!target) return message.reply('User not found.');
    await target.kick();
    message.reply(`${target.user.username} has been kicked.`);
    return;
  }

  // !ban command
  else if (command === '!ban') {
    if (message.member.id !== message.guild.ownerId) return message.reply('Only the server owner can ban users.');
    const target = await findUser(message, args[0]);
    if (!target) return message.reply('User not found.');
    try {
      await target.send("You have been banned from Sonia's server. Please DM the owner @soniasaurus5607 to appeal your ban.");
    } catch {
      console.log("Couldn't send DM.");
    }
    await target.ban();
    message.reply(`${target.user.username} has been banned.`);
    return;
  }

  // !unban command
  else if (command === '!unban') {
    if (message.member.id !== message.guild.ownerId) return message.reply('Only the server owner can unban users.');
    const bans = await message.guild.bans.fetch();
    const username = args[0];
    const bannedUser = bans.find(b => b.user.username.toLowerCase() === username?.toLowerCase());
    if (!bannedUser) return message.reply('User not found in ban list.');
    await message.guild.members.unban(bannedUser.user.id);
    message.reply(`${bannedUser.user.username} has been unbanned.`);
    return;
  }
});

client.login(process.env.TOKEN);
