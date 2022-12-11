const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const { green, greenTick } = require(`../../../util/config.json`)
const {AuthKey} = require('../../../util/config.json')
const {Role} = require('../../../util/config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gen')
		.setDescription('Gen 1 Day 1 Week 1 Month Lifetime')
		.addStringOption(option =>
			option.setName('type')
				.setDescription('The type of gen')
				.setRequired(true)
				.addChoice('1 Day', '1')
				.addChoice('1 Week', '7')
				.addChoice('1 Month', '30')
				.addChoice('Lifetime', '9999')),

	async execute(interaction) {
		//if user has role to run command
		if (interaction.member.roles.cache.has(Role)) {
			const user = interaction.user;
			const type = interaction.options.getString('type');
			const fetch = require('node-fetch');
			const response = await fetch(`https://keyauth.win/api/seller/?sellerkey=${AuthKey}&type=add&expiry=${type}&mask=Spoofer-XXXXXX&level=1&amount=1&format=text`);
			const text = await response.text();
			const embed = new MessageEmbed()
				.setColor(green)
				.setTitle(`${greenTick} Key Generated`)
				.setDescription(`**Key:** ${text}`)
				.setFooter(`Generated by ${user.tag}`, user.displayAvatarURL({ dynamic: true }))
				.setTimestamp();
			await user.send({ embeds: [embed] });
			embed2 = new MessageEmbed()
				.setColor(green)
				.setTitle(`${greenTick} Key Generated`)
				.setDescription(`**Look in your DMs!**`)
				.setFooter(`Generated by ${user.tag}`, user.displayAvatarURL({ dynamic: true }))
				.setTimestamp();
			await interaction.reply({ embeds: [embed2] });
			
		} else {
			const embed = new MessageEmbed()
				.setColor('RED')
				.setTitle('❌ Error')
				.setDescription('You do not have permission to run this command!')
				.setTimestamp();
			await interaction.reply({ embeds: [embed] });
		}
	}
}