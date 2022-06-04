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
        }
    ]
})

module.exports = model('contacts', schema)