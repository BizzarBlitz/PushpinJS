require("dotenv").config()

const DiscordJS = require("discord.js")

const CommandCallbacks = {
	["Pin/Unpin message"]: import("./CommandCallbacks/pin.mjs")
}

const Client = new DiscordJS.Client({
	intents: [
		DiscordJS.GatewayIntentBits.Guilds,
		DiscordJS.GatewayIntentBits.GuildMessages,
	]
})



Client.on(DiscordJS.Events.MessageCreate, (message) => {
	if (message.id !== message.channelId) return;

	message.pin("Autopinned")
})

Client.on(DiscordJS.Events.InteractionCreate, async interaction => {
	if (!interaction.isMessageContextMenuCommand()) return;

	const callback = CommandCallbacks[interaction.commandName]
	if (!callback) {
		console.warn("Unrecognized command:", interaction.commandName)
		return;
	}

	interaction.reply({
		content: await (await callback).default(interaction, Client) || "Done",
		ephemeral: true,
	})
})



Client.login(process.env.TOKEN)