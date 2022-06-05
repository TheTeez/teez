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
         * @type {ReturnType<typeof Baileys>}
         */
        this.client
    }
}

/**
 * @typedef {{category: string, description: string, usage: string, aliases?: string[]}} config
 */