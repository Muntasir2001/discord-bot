const { MessageEmbed } = require('discord.js');

const getMember = require('../../utilities/getMember');
const getReason = require('../../../globalUtils/getReason');
const infoMessageEmbed = require('../../../globalUtils/infoMessageEmbed');

const timeout = async (message, CMD_NAME, args, client) => {
   try {
      if (CMD_NAME === 'timeout') {
         if (!message.member.permissions.has('MODERATE_MEMBERS')) {
            return message.reply({
               embeds: [
                  infoMessageEmbed(
                     'HEY HEY HEY there, I see what you trynna do there :eyes:'
                  ),
               ],
            });
         }

         if (!args[0]) {
            return message.reply({
               embeds: [
                  infoMessageEmbed('Please provide an user ID or tag an User'),
               ],
            });
         }

         if (!args[1]) {
            return message.reply({
               embeds: [
                  infoMessageEmbed(
                     'Please provide number of minutes to timeout for'
                  ),
               ],
            });
         }

         if (!args[2]) {
            return message.reply({
               embeds: [infoMessageEmbed('Please provide a reason')],
            });
         }

         let member;
         const time = parseInt(args[1]);
         let isTimeout = true;

         if (message.mentions.members.first()) {
            member = message.mentions.members.first();
         } else {
            member = await getMember(client, args[0], message, false);
         }

         const reason = getReason(args, 2);

         await member
            .timeout(time * 1000 * 60, reason)
            .then((data) => {
               const timeoutEmbed = new MessageEmbed()
                  .setColor('#FF4454')
                  .setTitle(`:mute: Timed out ${member.user.tag}`)
                  .addFields(
                     {
                        name: 'Moderator',
                        value: `<@${message.author.id}>`,
                     },
                     {
                        name: 'Timed out user',
                        value: `<@${member.id}>`,
                     },
                     {
                        name: 'Timeout length',
                        value:
                           time === 1 ? `${time} minute` : `${time} minutes`,
                     },
                     {
                        name: 'Reason',
                        value: reason,
                     }
                  )
                  .setTimestamp()
                  .setFooter({ text: `Member ID: ${member.id}` });

               message.channel.send({ embeds: [timeoutEmbed] });
            })
            .catch((err) => {
               console.log(err);

               message.reply({
                  embeds: [
                     infoMessageEmbed(
                        `:x: Couldn't timeout ${member.user.tag}`,
                        'ERROR'
                     ),
                  ],
               });
            });
      }
   } catch (err) {
      console.log(err);

      return;
   }
};

module.exports = timeout;
