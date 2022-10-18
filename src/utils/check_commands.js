const Discord = require("discord.js");
const register_commands = require("./register_commands");

/**
 * @param {Discord.Client} client
 */

module.exports = (client) => {
    client.guilds.cache.forEach(async (guild) => {
        const commands =
            (await guild.commands.fetch().catch(() => {})) ||
            client.commands.size;
        if (commands.size != client.commands.size) {
            register_commands(guild);
        }
    });
};
