const express = require('express')
const { exec } = require('child_process')
const Helper = require('./Helper')

module.exports = class Server {
    /**
     * @param {number} PORT
     * @param {Helper} helper
     */
    constructor(helper) {
        /**
         * @type {Helper}
         */
        this.helper = helper

        this.app.get('/', (req, res) => {
            res.setHeader('Content-Type', 'text/plain')
            res.write('Go to /qr/:session to authenicate')
            res.end()
        })

        this.app.get('/qr/:session', (req, res) => {
            const { session } = req.params
            if (!this.helper.QR) {
                res.status(404)
                res.setHeader('Content-Type', 'text/plain')
                res.write('You are already authenicated')
                res.end()
                return
            }
            if (this.helper.config.session !== session) {
                res.status(404)
                res.setHeader('Content-Type', 'text/plain')
                res.write('Invalid session')
                res.end()
                return
            }
            res.setHeader('Content-Type', 'image/png')
            res.send(this.helper.QR)
            return
        })

        this.app.all('*', (req, res) => res.sendStatus(404))

        this.app.listen(this.helper.config.PORT, () =>
            this.helper.log(`Server started on PORT : ${this.helper.config.PORT}`)
        )
    }

    app = express()

    router = express.Router()
}