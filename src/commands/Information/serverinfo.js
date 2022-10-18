const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {Discord.Interaction} interaction
 */

exports.run = async function (client, interaction) {
    await interaction.deferReply();

    let guild = interaction.guild;
    let owner = await guild.fetchOwner();

    let channelCount = guild.channels.cache.size;
    let memberCount = guild.members.cache.filter(
        (member) => !member.user.bot
    ).size;
    let botCount = guild.members.cache.filter((member) => member.user.bot).size;
    let roleCount = guild.roles.cache.size;

    const embed = new Discord.EmbedBuilder()
        .setTitle(guild.name)
        .setThumbnail(guild.iconURL())
        .addFields(
            {
                name: "Server Owner",
                value: `${owner} (${owner.user.tag}) (${guild.ownerId})`,
            },
            {
                name: "Created At",
                value: guild.createdAt.toLocaleString(),
            },
            {
                name: "Channel Count",
                value: `${channelCount}`,
            },
            {
                name: "Member Count",
                value: `${memberCount}`,
            },
            {
                name: "Bot Count",
                value: `${botCount}`,
            },
            {
                name: "Role Count",
                value: `${roleCount}`,
            }
        )
        .setFooter({
            text: `ID: ${guild.id}`,
            iconURL: guild.iconURL(),
        });

    interaction.editReply({ embeds: [embed] });
};

exports.settings = {
    enabled: true,
    onlyOwner: false,
    perm: "",
    aliases: [],
};

exports.help = {
    name: "serverinfo",
    description: "Displays information about the server.",
    usage: "serverinfo",
    category: __dirname.slice(__dirname.lastIndexOf("\\") + 1),
};

exports.data = new Discord.SlashCommandBuilder()
    .setName(this.help.name)
    .setDescription(this.help.description);
