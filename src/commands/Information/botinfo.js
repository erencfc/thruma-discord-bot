const Discord = require("discord.js");
const { ownerID } = require("../../../config.json");

/**
 * @param {Discord.Client} client
 * @param {Discord.Interaction} interaction
 */

exports.run = async function (client, interaction) {
    await interaction.deferReply();

    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    const uptime = `${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye`;
    const owner = await client.users.fetch(ownerID);

    const embed = new Discord.EmbedBuilder()
        .setColor("Blue")
        .setDescription(
            `**Botun İsmi: \`${
                client.user.username
            }\`\n\nBotun Sürümü: \`V1.0\`\n\nBotun Sahibi: <@${owner.id}> (${
                owner.tag
            })\n\nBotun Açık Kalma Süresi: \`${uptime}\`\n\nBotun Kuruluş Tarihi: \`${client.user.createdAt.toLocaleDateString()}\`\n\nSunucu Sayısı: \`${
                client.guilds.cache.size
            }\`\n\nKanal Sayısı: \`${
                client.channels.cache.size
            }\`\n\nÜye Sayısı: \`${client.users.cache.size}\`**`
        );

    interaction.editReply({ embeds: [embed] });
};

exports.settings = {
    enabled: true,
    onlyOwner: false,
    perm: "",
    aliases: [],
};

exports.help = {
    name: "botinfo",
    description: "Displays informations about bot.",
    usage: "botinfo",
    category: __dirname.slice(__dirname.lastIndexOf("\\") + 1),
};

exports.data = new Discord.SlashCommandBuilder()
    .setName(this.help.name)
    .setDescription(this.help.description);
