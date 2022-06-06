require('dotenv').config()
const {
    default: Baileys,
    DisconnectReason,
    useSingleFileAuthState,
    fetchLatestBaileysVersion
} = require('@adiwajshing/baileys')
const P = require('pino')
const { Boom } = require('@hapi/boom')
const qr = require('qr-image')
const mongoose = require('mongoose')
const Message = require('./Structures/Message')
const MessageHandler = require('./Handlers/Message')
const Helper = require('./Structures/Helper')
const Server = require('./Structures/Server')

const start = async () => {
    const ports = '3000, 4000, 5000, 6000, 7000'.split(', ').map((port) => parseInt(port))
    process.env.PORT = ports[Math.floor(Math.random() * ports.length)]
    const helper = new Helper({
        prefix: process.env.PREFIX || ':',
        name: process.env.NAME || 'Bot',
        mods: (process.env.MODS || '').split(', ').map((jid) => `${jid}@s.whatsapp.net`),
        session: process.env.SESSION || 'SESSION',
        PORT: process.env.PORT || ports[Math.floor(Math.random() * ports.length)]
    })

    if (!process.env.MONGO_URI || process.env.MONGO_URI === '') {
        throw new Error('No MongoDB URI provided')
    }

    mongoose.connect(process.env.MONGO_URI)

    helper.log('Connected to the Database')

    new Server(helper).listen(helper.config.PORT)

    const { state, saveState } = useSingleFileAuthState('./session.json')

    const client = Baileys({
        version: (await fetchLatestBaileysVersion()).version,
        printQRInTerminal: true,
        auth: state,
        logger: P({ level: 'fatal' }),
        browser: ['WhatsApp-bot', 'fatal', '1.0.0']
    })

    const messageHandler = new MessageHandler(client, helper)

    messageHandler.loadCommands()

    client.ev.on('messages.upsert', async ({ messages }) => {
        const M = await new Message(messages[0], client).simplifyMessage()
        await messageHandler.handleMessage(M)
    })

    client.ev.on('contacts.update', async (contacts) => await helper.contact.saveContacts(contacts))

    client.ev.on('connection.update', (update) => {
        if (update.qr) {
            helper.log(
                `QR code generated. Scan it to continue | You can also authenicate in http://localhost:${helper.config.PORT}`
            )
            helper.QR = qr.imageSync(update.qr)
        }
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const { statusCode } = new Boom(lastDisconnect?.error)?.output
            if (statusCode === DisconnectReason.badSession) client.logout()
            else if (statusCode === DisconnectReason.connectionClosed) start()
            else if (statusCode === DisconnectReason.connectionLost) start()
            else if (statusCode === DisconnectReason.connectionReplaced) client.logout()
            else if (statusCode === DisconnectReason.loggedOut) client.logout()
            else if (statusCode === DisconnectReason.restartRequired) start()
            else if (statusCode === DisconnectReason.timedOut) start()
            else client.end('Disconnected')
        }
        if (connection === 'connecting') helper.log('Connecting to WhatsApp...')
        if (connection === 'open') helper.log('Connected to WhatsApp')
    })

    client.ev.on('creds.update', saveState)

    return client
}

start()
