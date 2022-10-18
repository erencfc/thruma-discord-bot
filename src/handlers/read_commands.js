const { SlashCommandBuilder } = require("discord.js");
const { readdir, readdirSync } = require("fs");
const ascii = require("ascii-table");
const table = new ascii("Commands");
table.setHeading("Command", "Load Status");

module.exports = (client) => {
    readdir("./src/commands/", (err, dirs) => {
        if (err) return console.log(err);

        dirs.forEach((dir) => {
            const commands = readdirSync(`./src/commands/${dir}`).filter(
                (file) => file.endsWith(".js")
            );
            for (let file of commands) {
                let props = require(`../commands/${dir}/${file}`);

                if (!props.run || !props.settings || !props.data) {
                    table.addRow(file, `✘`);
                    continue;
                } else {
                    const body = props.data;
                    client.commands.set(props.help.name, { props, body });
                    table.addRow(file, "✔");
                }
                if (
                    props.settings.aliases &&
                    Array.isArray(props.settings.aliases)
                )
                    props.settings.aliases.forEach((alias) => {
                        client.aliases.set(alias, props.help.name);
                    });
            }
        });

        console.log(table.toString());
    });
};
