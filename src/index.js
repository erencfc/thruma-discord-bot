const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const mongoose = require("mongoose");
require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", (c) => {
    c.user.setPresence({
        status: "idle",
        activities: [
            { name: "Still on development!", type: ActivityType.Competing },
        ],
    });
    console.log(`${c.user.tag} is online!`);
});

(async function () {
    await mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB Connected."));
})();

client.login(process.env.TOKEN);
