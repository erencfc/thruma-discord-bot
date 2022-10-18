const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {Discord.Interaction} interaction
 */

exports.run = async function (client, interaction) {
    let member =
        interaction.options._hoistedOptions?.[0]?.member || interaction.member;
    let avatar = await member.displayAvatarURL({ size: 2048, dynamic: true });

    let embed = new Discord.EmbedBuilder()
        .setColor("Aqua")
        .setTitle(`\`${member.displayName}\`'s Avatar`)
        .setImage(avatar);

    interaction.reply({ embeds: [embed] });
};

exports.settings = {
    enabled: true,
    onlyOwner: false,
    perm: "",
    aliases: [],
};

exports.help = {
    name: "avatar",
    description: "Displays the user's avatar.",
    usage: "avatar",
    category: __dirname.slice(__dirname.lastIndexOf("\\") + 1),
};

exports.data = new Discord.SlashCommandBuilder()
    .setName(this.help.name)
    .setDescription(this.help.description)
    .addMentionableOption((option) =>
        option.setName("user").setDescription("Mention a user.")
    );
