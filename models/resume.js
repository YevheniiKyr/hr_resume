const mongoose = require('mongoose')

const Resume = new mongoose.Schema({

    fullname: {type: String, required: true},
    city: {type: String, required: true},
    university: {type: String},
    hobbies: [{type: String, required:true}],
    skills: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required:true}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    prev_companies: [{type: String, required:true}],

})


module.exports = mongoose.models.Resume || mongoose.model('Resume', Resume)