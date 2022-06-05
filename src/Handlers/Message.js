const { join } = require('path')
const { readdirSync } = require('fs-extra')
const Message = require('../Structures/Message')
const Helper = require('../Structures/Helper')
const Command = require('../Structures/Command')

module.exports = class MessageHandler {
    /**
     * @param {client} client
     * @param {Helper} helper
     */
    constructor(client, helper) {
        /**
         * @type {client}
         */
        this.client = client
        /**
         * @type {Helper}
         */
        this.helper = helper
    }

    /**
     * @param {Message} M
     * @returns {Promise<void>}
     */

    handleMessage = async (M) => {
        const { prefix } = this.helper.config
        const args = M.content.split(' ')
        let title = 'DM'
        if (M.chat === 'group') {
            try {
                const { subject } = await this.client.groupMetadata(M.from)
                title = subject || 'Group'
            } catch (error) {
                title = 'Group'
            }
        }
        if (!args[0] || !args[0].startsWith(prefix))
            return void console.log(`Message from ${M.sender.username} in ${title}`)
        console.log(`Command ${args[0]}[${args.length - 1}] from ${M.sender.username} in ${title}`)
        const cmd = args[0].toLowerCase().slice(prefix.length)
        const command = this.commands.get(cmd) || this.aliases.get(cmd)
        if (!command) return void M.reply('No such command, Baka!')
        if (command.config.category === 'dev' && !this.helper.config.mods.includes(M.sender.jid))
            return void M.reply('This command can only be used by the MODS')
        if (M.chat === 'dm' && !command.config.dm) return void M.reply('This command can only be used in groups')
        await this.helper.DB.setExp(M.sender.jid, command.config.exp || 10)
        try {
            await command.execute(M, this.formatArgs(args))
        } catch (error) {
            console.log(err.message)
        }
    }

    /**
     * @returns {void}
     */

    loadCommands = () => {
        console.log('Loading Commands...')
        const files = readdirSync(join(__dirname, '..', 'Commands')).filter((file) => !file.endsWith('___.js'))
        for (const file of files) {
            const Commands = readdirSync(join(__dirname, '..', 'Commands', file))
            for (const Command of Commands) {
                /**
                 * @constant
                 * @type {Command}
                 */
                const command = new (require(`../Commands/${file}/${Command}`))()
                command.client = this.client
                command.helper = this.helper
                command.handler = this
                this.commands.set(command.name, command)
                if (command.config.aliases) command.config.aliases.forEach((alias) => this.aliases.set(alias, command))
                console.log(`Loaded: ${command.name} from ${command.config.category}`)
            }
        }
        return void console.log(
            `Successfully loaded ${this.commands.size} ${this.commands.size > 1 ? 'commands' : 'command'} with ${
                this.aliases.size
            } ${this.aliases.size > 1 ? 'aliases' : 'alias'}`
        )
    }

    /**
     * @private
     * @param {string[]} args
     * @returns {args}
     */

    formatArgs = (args) => {
        args.splice(0, 1)
        return {
            args,
            context: args.join(' ').trim(),
            flags: args.filter((arg) => arg.startsWith('--'))
        }
    }

    /**
     * @type {Map<string, Command>}
     */

    commands = new Map()

    /**
     * @type {Map<string, Command>}
     */

    aliases = new Map()
}

/**
 * @typedef {import('../Structures/Command').client} client
 */

/**
 * @typedef {import('../Structures/Command').config} config
 */

/**
 * @typedef {{context: string, args: string, flags: string[]}} args
 */
