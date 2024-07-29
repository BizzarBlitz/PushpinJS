require("dotenv").config()

const {Client, Intents} = require("discord.js")
const client = new Client({
	intents: [
		
	]
})

client.login(process.env.TOKEN)