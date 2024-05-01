const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
require("dotenv").config();


const commands = [
    {
        name: "ping",
        description: "Shows the client & websocket latency.",
    },
    {
        name: "help",
        description: "Displays the Help Page.",
        options: [
            {
                name: "command",
                description: "The specific command to view.",
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: "help",
                        value: "help",
                    },
                    {
                        name: "ping",
                        value: "ping",
                    },
                ]
            }
        ]
    }
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
