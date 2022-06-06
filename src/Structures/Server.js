const express = require('express')
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

        this.app.use(express.json())

        this.app.get('/', (req, res) => {
            res.send({
                message: 'Go to /qr/:session to authenicate'
            })
        })

        this.app.get('/qr/:session', (req, res) => {
            const { session } = req.params
            if (!this.helper.QR) {
                res.send({
                    message: 'QR not generated'
                })
                return
            }
            if (this.helper.config.session !== session) {
                res.send({
                    message: 'Invalid session'
                })
                return
            }
            res.setHeader('Content-Type', 'image/png')
            res.send(this.helper.QR)
        })

        this.app.all('*', (req, res) => res.sendStatus(404))
    }

    listen = (port) => this.app.listen(port, () => helper.log(`Server started on PORT : ${port}`))

    app = express()

    router = express.Router()
}
