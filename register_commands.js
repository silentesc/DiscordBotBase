const { REST, Routes } = require("discord.js");
require("dotenv").config();


const commands = [
    {
        name: "ping",
        description: "Replies with Pong!",
    },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Registering slash commands.");
    
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    
        console.log("Slash commands have been registered.");
    } catch (error) {
        console.error(error);
    }
})();
