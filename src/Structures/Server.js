const express = require('express')
const Helper = require('./Helper')

module.exports = class Server {
    /**
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

        this.app.get('/qr/:session', async (req, res) => {
            const { session } = req.params
            const { authenicated } = await this.helper.DB.getSession(this.helper.config.session)
            if (authenicated)
                return void res
                    .status(404)
                    .setHeader('Content-Type', 'text/plain')
                    .send('You are already authenicated to WhatsApp')
                    .end()
            if (!this.helper.QR)
                return void res.status(404).setHeader('Content-Type', 'text/plain').send('QR not generated').end()
            if (this.helper.config.session !== session)
                return void res.status(404).setHeader('Content-Type', 'text/plain').send('Invalid session').end()
            res.status(200).setHeader('Content-Type', 'image/png').send(this.helper.QR)
        })

        this.app.all('*', (req, res) => res.sendStatus(404))

        this.app.listen(this.helper.config.PORT, () =>
            this.helper.log(`Server started on PORT : ${this.helper.config.PORT}`)
        )
    }

    app = express()

    router = express.Router()
}
