const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {Discord.Interaction} interaction
 */

exports.run = async function (client, interaction) {
    const embed = new Discord.EmbedBuilder()
        .setColor("DarkAqua")
        .setDescription(
            `**You can add this bot by using [this](https://discord.com/api/oauth2/authorize?client_id=944649778980061208&permissions=8&scope=bot%20applications.commands) link.**`
        );

    interaction.reply({ embeds: [embed] });
};

exports.settings = {
    enabled: true,
    onlyOwner: false,
    perm: "",
    aliases: [],
};

exports.help = {
    name: "invite",
    description: "Sends bot's invite link.",
    usage: "invite",
    category: __dirname.slice(__dirname.lastIndexOf("\\") + 1),
};

exports.data = new Discord.SlashCommandBuilder()
    .setName(this.help.name)
    .setDescription(this.help.description);
