const mongoose = require('mongoose')

const User = new mongoose.Schema({

    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

module.exports = mongoose.model('User', User)