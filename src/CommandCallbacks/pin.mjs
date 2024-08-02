const MAX_PINNED = 50

export default async function(interaction) {
	const channel = interaction.channel

	// Make sure channel is a thread
	const ownerId = channel.ownerId
	if (!ownerId) {
		return "This command can only be used in threads"
	}

	// Make sure command user owns thread
	const user = interaction.user
	if (user.id !== ownerId) {
		return "You must be the thread author to pin/unpin messages"
	}

	// Make sure message is pinnable
	const message = interaction.targetMessage
	if (!message.pinnable) {
		return "Message cannot be pinned"
	}

	// Make sure channel pins aren't maxxed out
	const pinnedMessages = await channel.messages.fetchPinned()
	if (pinnedMessages.size === MAX_PINNED) {
		return `Channel has reached the pin limit of ${MAX_PINNED} messages`
	}

	// Unpin message if already pinned
	if (message.pinned) {
		message.unpin(`Unpinned by ${user.username}`)
		return "Message unpinned"
	}

	// Pin message
	message.pin(`Pinned by ${user.username}`)
	return "Message pinned"
}