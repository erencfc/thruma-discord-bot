const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {Discord.MessageInteraction} interaction
 */

exports.run = async function (client, interaction) {
    const { emoji, ws } = interaction.client;
    const discord_ping = ws.ping;
    const bot_ping = Math.abs(Date.now() - interaction.createdTimestamp);

    const embed = new Discord.EmbedBuilder().setColor("White").addFields(
        {
            name: `${emoji("discord")} Discord Latency`,
            value: `${discord_ping} ms`,
            inline: true,
        },
        {
            name: `${emoji("latency")} Bot Latency`,
            value: `${bot_ping} ms`,
            inline: true,
        }
    );

    await interaction.reply({ embeds: [embed] });
};

exports.settings = {
    enabled: true,
    onlyOwner: false,
    perm: "",
    aliases: [],
};

exports.help = {
    name: "ping",
    description: "Test the latency.",
    usage: "ping",
    category: __dirname.slice(__dirname.lastIndexOf("\\") + 1),
};
