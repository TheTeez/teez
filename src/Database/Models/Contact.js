const { Schema, model } = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },

    data: [
        {
            id: String,
            notify: String,
            name: String,
            verifiedName: String,
            status: String,
            imgUrl: String
        }
    ]
})

module.exports = model('contacts', schema)
