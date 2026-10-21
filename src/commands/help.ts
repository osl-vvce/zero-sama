import TelegramBot from "node-telegram-bot-api"
import { ADMIN_IDs } from "../utils/constants"

const DESCRIPTION = `
Available commands:

/help - Show this help message
/report - Submit your weekly report
/noshow - Report that your source is not responding
/add - Add yourself to the reporting system
/remove - Remove yourself from the reporting system
/update - Update your username or USN
`

const ADMIN_DESCRIPTION = `
Admin operations:

message - Send a message to the OSL group
`

export const help = (bot: TelegramBot) => {
  bot.onText(/\/help/, async msg => {
    const isAdmin = ADMIN_IDs.includes(msg.chat.id)

    const description = isAdmin ? DESCRIPTION + ADMIN_DESCRIPTION : DESCRIPTION

    await bot.sendMessage(msg.chat.id, description)
  })
}
