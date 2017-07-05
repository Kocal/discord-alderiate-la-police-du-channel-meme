#!/usr/bin/env node

const token = require('../token');
const Discord = require('discord.js');
const client = new Discord.Client();

client.login(token);

client.on('ready', () => {
  console.info('Connecté !');
});

client.on('message', message => {
  if (authorIsBot(message) || !messageInProperChannel(message)) {
    return;
  }

  // S'il y a du texte
  if (message.content.trim().length > 0) {
    message.reply("Le texte est interdit dans le channel #meme. Ce message s'auto-détruira dans 5 secondes...")
      .then(responseMessage => setTimeout(() => responseMessage.delete(), 5000));
    message.delete();
  }
});

function authorIsBot(message) {
  return message.author.id === client.user.id;
}

function messageInProperChannel(message) {
  return [
    '330013240677629952', // Alderiate - Memes
    '327318853510103041' // Kocal - Tests for bot
  ].includes(message.channel.id)
}
