const chalk = require('chalk')
const Database = require('./Database')
const Contact = require('./Contact')
const { Utils } = require('../lib')

module.exports = class Helper {
    /**
     * @param {{prefix: string, name: string, mods?: string[]}} config
     */
    constructor(config) {
        this.config = config
    }

    utils = new Utils()

    contact = new Contact()

    DB = new Database()

    /**
     * @param {string} text
     * @param {boolean} error
     * @returns {void}
     */

    log = (text, error = false) =>
        console.log(chalk[error ? 'red' : 'blue']('[BOT]'), chalk[error ? 'redBright' : 'greenBright'](text))
}
