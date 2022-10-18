const { REST, Routes } = require("discord.js");

module.exports = async (guild) => {
    const client = guild.client;
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
    const body = client.commands.map((command) => command.body);
    try {
        await rest.put(
            Routes.applicationGuildCommands(client.user.id, guild.id),
            {
                body,
            }
        );
    } catch (e) {}
};
