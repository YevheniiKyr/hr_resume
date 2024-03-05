const mongoose = require('mongoose')

const Skill = new mongoose.Schema({
    name: {type: String, required: true},
})


module.exports = mongoose.models.Resume || mongoose.model('Skill', Skill)