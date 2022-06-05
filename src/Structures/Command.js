const Baileys = require('@adiwajshing/baileys').default
const Helper = require('./Helper')
const Message = require('./Message')

module.exports = class Command {
    /**
     * @param {string} name
     * @param {config} config
     */

    constructor(name, config) {
        /**
         * @type {string}
         */
        this.name = name
        /**
         * @type {config}
         */
        this.config = config
        /**
         * @type {Helper}
         */
        this.helper
        /**
         * @type {client}
         */
        this.client
    }

    /**
     * @param {Message} M
     * @param {args} args
     * @returns {Promise<void | never>}
     */

    execute = async (M, args) => {
        throw new Error('Command method not implemented')
    }
}

/**
 * @typedef {{category: 'general', description: string, usage: string, aliases?: string[]}} config
 */

/**
 * @typedef {ReturnType<typeof Baileys>} client
 */

/**
 * @typedef {import('../Handlers/Message').args} args
 */
