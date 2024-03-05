const router = require('express').Router()
const Controller = require("./controller");


router.get('/resume/:id', Controller.getResume)
router.get('/hobbies', Controller.getAllHobbiesFromAllResumes)
router.get('/cities', Controller.getAllCitiesFromAllResumes)
router.get('/hobbies/:city', Controller.getAllHobbiesOfPeopleLivingInCity)
router.get('/colleagues', Controller.getPeopleWorkedInSameCompany)

module.exports = router