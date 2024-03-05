require(`dotenv`).config()
const mongoose = require("mongoose")
const express = require('express')
const cors = require("cors")
const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 5000
const User = require('./models/user');
const Skill = require('./models/skill');
const Resume = require('./models/resume');
const router = require('./router')

const app = express()
mongoose.set('strictQuery', true)

mongoose.connect(DB_URL)


app.use(cors())
app.use(express.json())

//INIT SCRIPT
// Define sample data
// Define sample data
async function initData() {
    const usersData = [
        {login: 'john_doe', password: 'password1'},
        {login: 'jane_smith', password: 'password2'},
        {login: 'bob_johnson', password: 'password3'},
        {login: 'alice_johnson', password: 'password4'},
        {login: 'eva_miller', password: 'password5'},
        {login: 'michael_davis', password: 'password6'},
        {login: 'sophia_brown', password: 'password7'},
        {login: 'liam_wilson', password: 'password8'},
        {login: 'olivia_jones', password: 'password9'},
        {login: 'aiden_white', password: 'password10'},
    ];

    const skillsData = [
        {name: 'JavaScript'},
        {name: 'Python'},
        {name: 'Graphic Design'},
        {name: 'Project Management'},
        {name: 'Data Analysis'},
        // Add more skill data as needed
    ];

// Insert sample data into the User and Skill collections
    const insertedUsers = await User.insertMany(usersData)
    const insertedSkills = await Skill.insertMany(skillsData)

// Define resumes data with related user and skill references
    const resumesData = insertedUsers.map((user, index) => ({
        fullname: user.login.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()), // Convert username to title case
        city: `City${index + 1}`,
        university: `University${index + 1}`,
        hobbies: [`Hobby${index + 1}_1`, `Hobby${index + 1}_2`],
        skills: [insertedSkills[index % insertedSkills.length]._id],
        user: user._id,
        prev_companies: [`Company${index + 1}_1`, `Company${index + 1}_2`],
    }));

// Insert sample data into the Resume collection
    await Resume.insertMany(resumesData);
}

async function initDataWithRollback() {
    try {
         await initData()
    } catch (e) {
        console.log(e)
         await clearAll()
    }
}
async function clearAll() {
    await User.deleteMany({})
    await Skill.deleteMany({})
    await Resume.deleteMany({})
}


// clearAll().then(() => initDataWithRollback())

app.use(router)
app.listen(PORT, () => console.log("server is started on Port", PORT))
