const Database = require('./Database')
const Contact = require('./Contact')
const { Utils } = require('../lib')

module.exports = class Helper {
    /**
     * @param {{prefix: string, name: string}} config
     */
    constructor(config) {
        this.config = config
    }

    utils = new Utils()

    contact = new Contact()

    DB = new Database()
}
