const Baileys = require('@adiwajshing/baileys').default
const Helper = require('./Helper')

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
}

/**
 * @typedef {{category: 'general', description: string, usage: string, aliases?: string[]}} config
 */

/**
 * @typedef {ReturnType<typeof Baileys>} client
 */
