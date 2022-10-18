const Discord = require("discord.js");
const { ownerID } = require("../../../config.json");

let talkedRecently = new Set();

/**
 * @param {Discord.Client} client
 * @param {Discord.Interaction} interaction
 */

const embed = new Discord.EmbedBuilder().setColor("Red");

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    let cmdName = interaction.commandName;
    let cmd;

    if (client.commands.has(cmdName)) cmd = client.commands.get(cmdName);
    else if (client.aliases.has(cmdName))
        cmd = client.commands.get(client.aliases.get(cmdName));

    if (!cmd) return;

    let perm = cmd.props.settings.perm;

    if (interaction.user.id !== ownerID) {
        // Permission Control
        if (perm && !interaction.memberPermissions.has(perm))
            return interaction.reply({
                embeds: [
                    embed.setDescription(
                        `**You need \`${perm}\` permission to use this command.**`
                    ),
                ],
            });

        // Cooldown Control
        if (talkedRecently.has(interaction.user.id))
            return interaction.reply({
                embeds: [
                    embed.setDescription(`**You are spamming commands!**`),
                ],
            });

        talkedRecently.add(interaction.user.id);
        setTimeout(() => {
            talkedRecently.delete(interaction.user.id);
        }, 1500);
    }

    try {
        await cmd.props.run(client, interaction);
    } catch (error) {
        // if ((error.code = 50001)) {
        //     const owner = await interaction.guild.fetchOwner();

        //     console.error(error);
        //     return owner
        //         .send({
        //             embeds: [
        //                 embed.setDescription(
        //                     `**Add this bot again with this [link](https://discord.com/api/oauth2/authorize?client_id=944649778980061208&permissions=8&scope=bot%20applications.commands).**`
        //                 ),
        //             ],
        //         })
        //         .catch(() => {});
        // }

        console.error(error);
        await interaction.reply({
            content:
                "There was an unexpected error while executing this command!",
            ephemeral: true,
        });
    }
};
