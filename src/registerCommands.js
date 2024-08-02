require("dotenv").config()
const {REST, Routes} = require("discord.js")

const Commands = [
	{
		name: "Pin/Unpin message",
		type: 3, // Message
	},
]

const rest = new REST({version: "10"}).setToken(process.env.TOKEN)



async function restPutGlobalCommands(commands) {
	return await rest.put(
		Routes.applicationCommands(process.env.CLIENT_ID),
		{body: commands}
	)
}

async function restPutGuildCommands(commands, guildId) {
	return await rest.put(
		Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
		{body: commands}
	)
}
	
async function registerCommands(commands, guildId) {
	try {
		console.log("Registering application commands...")

		await guildId ? restPutGuildCommands(commands, guildId) : restPutGlobalCommands(commands)

		console.log("Application commands were registered successfully")
	} catch(error) {
		console.log(`Error regiseting application commands: ${error}`)
	}
}



registerCommands(Commands) // Register for all servers
// registerCommands(Commands, process.env.GUILD_ID) // Register for specific server