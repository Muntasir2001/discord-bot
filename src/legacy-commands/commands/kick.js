const kick = async (message, CMD_NAME, args) => {
	let isKickable = true;

	//kicking people out
	if (CMD_NAME === 'kick') {
		if (!message.member.permissions.has('KICK_MEMBERS')) {
			return message.reply(
				'HEY HEY HEY there, I see what you trynna do there :eyes:',
			);
		}
		if (args.length === 0) return message.reply('please provide an ID');

		// const member = message.guild.members.cache.get(args[0]);
		const member =
			message.mentions.members.first() ||
			(await message.guild.members.fetch(args[0]).catch((err) => {
				message.channel.send(`${args[0]} is an unknown user`);

				isKickable = false;
			}));

		if (isKickable) {
			member
				.kick()
				.then((member) => {
					message.channel.send(
						`${member} was kicked out of the server :3`,
					);
				})
				.catch((err) =>
					message.channel.send('Welp, something went wrong ;-;'),
				);
		}
	}
};

module.exports = kick;
