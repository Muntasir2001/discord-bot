const Discord = require('discord.js');
// const { version } = require('../package.json');
const PREFIX = process.env.PREFIX;

const botInfo = (message, CMD_NAME, args, client) => {
   // console.log(client);

   const { user, guilds } = client;

   const botInfoEmbed = new Discord.MessageEmbed()
      .setColor('#ff4454')
      .setThumbnail(user.displayAvatarURL())
      .setAuthor({
         name: `${user.username}`,
         iconURL: `${user.displayAvatarURL()}`,
      })
      .addFields(
         // { name: '\u200B', value: '\u200B' },
         { name: 'Bot Tag', value: `${user.tag}` },
         { name: 'Bot version', value: `1.0.0` },
         { name: 'Bot command prefix', value: `${PREFIX}` },
         {
            name: 'Time since last restart',
            value: `${process.uptime().toFixed(2)}s`,
         },
         {
            name: 'Server Count',
            value: `${guilds.cache.size}`,
         }
      )
      .setTimestamp();

   if (CMD_NAME === 'botinfo') {
      message.channel.send({ embeds: [botInfoEmbed] });
   }
};

module.exports = botInfo;
