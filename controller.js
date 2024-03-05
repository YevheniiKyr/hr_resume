const Resume = require('./models/resume')

class Controller {
    async getResume(req, res) {
        try {
            console.log(req.params.id)
            const resume = await Resume.findById(req.params.id).populate('skills').exec()
            res.json(resume)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAllHobbiesFromAllResumes(req, res) {
        try {
            let hobbies;
            if (req.query.city) {
                hobbies = await Resume.where({city: req.query.city}).distinct('hobbies')
            } else hobbies = await Resume.distinct('hobbies')
            res.json(hobbies)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAllCitiesFromAllResumes(req, res) {
        try {
            const cities = await Resume.distinct('city')
            res.json(cities)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAllHobbiesOfPeopleLivingInCity(req, res) {
        try {
            const hobbies = await Resume.where({city: req.query.city})
            res.json(hobbies)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getPeopleWorkedInSameCompany(req, res) {
        try {
            const peopleInSameCompany = await Resume.aggregate([
                {
                    $unwind: '$prev_companies',
                },
                {
                    $group: {
                        _id: '$prev_companies',
                        people: {
                            $push: {
                                fullname: '$fullname',
                                // city: '$city',
                                // university: '$university',
                                // hobbies: '$hobbies',
                                // skills: '$skills',
                                // user: '$user',
                            },
                        },
                    },
                },
            ]);
            res.json(peopleInSameCompany)
        } catch (e) {
            res.status(500).json(e)
        }
    }


}

module.exports = new Controller()