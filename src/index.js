const { Client, Collection, GatewayIntentBits } = require("discord.js");
const mongoose = require("mongoose");
const { readdir, readdirSync } = require("fs");

require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.aliases = new Collection();
client.emoji = (emoji) => {
    return client.emojis.cache.find((e) => e.name == emoji);
};

readdir("./src/handlers", (_, files) => {
    files.map((file) => {
        let handler = file.split(".")[0];
        require(`./handlers/${handler}`)(client);
    });
});

(async function () {
    await mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB Connected."));
})();

client.login(process.env.TOKEN);
