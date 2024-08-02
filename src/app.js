require("dotenv").config()

const DiscordJS = require("discord.js")

const CommandCallbacks = {
	["Pin/Unpin"]: import("./CommandCallbacks/pin.mjs")
}

const Client = new DiscordJS.Client({
	intents: [
		DiscordJS.GatewayIntentBits.Guilds
	]
})


Client.on(DiscordJS.Events.InteractionCreate, async interaction => {
	if (!interaction.isMessageContextMenuCommand()) return;

	const callback = CommandCallbacks[interaction.commandName]
	if (!callback) {
		console.warn("Unrecognized command:", interaction.commandName)
		return;
	}

	interaction.reply({
		content: callback(interaction, Client) || "Done",
		ephemeral: true,
	})
})

console.log(process.env.TOKEN)
Client.login(process.env.TOKEN)