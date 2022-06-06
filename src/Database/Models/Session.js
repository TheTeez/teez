const { model, Schema } = require('mongoose')

const schema = new Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },

    authenicated: {
        type: Boolean,
        required: true,
        default: false
    },

    session: String
})

module.exports = model('sessions', schema)
