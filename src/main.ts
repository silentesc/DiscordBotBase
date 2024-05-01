import { Client, GatewayIntentBits, ActivityType } from "discord.js";
import { readdirSync } from "fs";
import "dotenv/config";


const commands = new Map();
readdirSync("./src/commands").filter(file => file.endsWith(".ts")).forEach(fileName => {
    const commandName = fileName.split(".ts")[0];
    const command = require(`./commands/${commandName}`);
    commands.set(commandName, command);
});

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.on("ready", c => {
    console.log(`Logged in as ${c.user.tag}`);
    client.user?.setActivity({
        name: "Use /help",
        type: ActivityType.Custom
    });
});


client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);
    if (command) {
        await command.execute(client, interaction);
    }
});


client.login(process.env.TOKEN);
