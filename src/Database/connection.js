const { default: mongoose } = require('mongoose')

module.exports = class connect {
    /**
     * @param {string} uri
     */
    constructor(uri) {
        /**
         * @type {string}
         */
        this.uri = uri
    }

    /**
     * @returns {Promise<mongoose.Connection>}
     */

    connect = async () => {
        if (!this.uri || this.uri === '') throw new Error('No MongoDB URI provided')
        const db = mongoose.connection
        mongoose.connect(encodeURI(this.uri))
        return await new Promise((resolve, reject) => {
            db.on('error', (error) => {
                reject(error)
            })

            db.once('open', () => {
                resolve(db)
            })
        })
    }
}
