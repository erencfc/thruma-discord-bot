const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {Discord.Interaction} interaction
 */

exports.run = async function (client, interaction) {
    const member =
        interaction.options._hoistedOptions?.[0]?.member || interaction.member;

    let everPermissions = member.guild.roles.everyone.permissions.toArray();

    const permissions =
        member.permissions
            .toArray()
            .filter((p) => !everPermissions.includes(p))
            .map((p) =>
                p
                    .toLowerCase()
                    .replace(/_/g, " ")
                    .replace(/\w\S*/g, (txt) => {
                        return (
                            txt.charAt(0).toUpperCase() +
                            txt.substr(1).toLowerCase()
                        );
                    })
            )
            .join(", ") || "`None`";

    const roles =
        member.roles.cache
            .filter((r) => r.name != "@everyone")
            .map((r) => r)
            .join(", ") || "`None`";

    let joinPosition;
    const members = interaction.guild.members.cache;
    members.sort((a, b) => a.joinedAt - b.joinedAt);
    for (let i = 0; i < members.size; i++) {
        if (members.toJSON()[i].id == member.id) joinPosition = i;
    }

    const embed = new Discord.EmbedBuilder()
        .setDescription(`${member} (${member.user.tag}) (${member.id})`)
        .setFields(
            {
                name: "User Created At",
                value: member.user.createdAt.toLocaleString(),
            },
            {
                name: "User Joined At",
                value: member.joinedAt.toLocaleString(),
            },
            {
                name: "Guild Join Position",
                value: `${joinPosition + 1} / ${members.size}`,
            },
            {
                name: "Permissions",
                value: permissions,
            },
            {
                name: "Roles",
                value: roles,
            }
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
    name: "userinfo",
    description: "Displays information about any user.",
    usage: "userinfo",
    category: __dirname.slice(__dirname.lastIndexOf("\\") + 1),
};

exports.data = new Discord.SlashCommandBuilder()
    .setName(this.help.name)
    .setDescription(this.help.description)
    .addMentionableOption((option) =>
        option.setName("user").setDescription("Mention a user")
    );
