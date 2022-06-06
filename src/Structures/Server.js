const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
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

        this.app.use(cors())
        this.app.use(morgan('tiny'))
        this.app.use(express.json())

        this.app.get('/', (req, res) => {
            res.status(200)
            res.setHeader('Content-Type', 'application/json')
            res.json({
                message: 'Go to /qr/:session to authenicate'
            })
            res.end()
        })

        this.app.get('/qr/:session', (req, res) => {
            const { session } = req.params
            if (!this.helper.QR) {
                res.status(404)
                res.setHeader('Content-Type', 'application/json')
                res.json({
                    message: 'QR code not generated'
                })
                res.end()
                return
            }
            if (this.helper.config.session !== session) {
                res.status(404)
                res.setHeader('Content-Type', 'application/json')
                res.write({
                    message: 'Invalid session'
                })
                res.end()
                return
            }
            res.status(200)
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
