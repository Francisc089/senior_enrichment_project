//routes for schools
const router = require('express').Router();
const { models } = require('../db');
const { Student, School } = models;
const bodyParser = require('body-parser')

router.use(bodyParser.json());

module.exports = router;

// /schools
router.get('/', (req, res, next) => {
  School.findAll({
    include : [ Student ]
  })
    .then(school => res.json(school))
    .catch(next)
});

// /schools/:schoolId
router.get('/:schoolId', (req, res, next) => {
  School.findOne({
    where : { id : req.params.schoolId },
    include : [ Student ]
  })
    .then(school => res.json(school))
    .catch(next)
});

//update school
router.put('/:schoolId', (req, res, next) => {
  School.findById(req.params.schoolId)
    .then(school => school.update(req.body))
    .catch(next)
});

//create school
router.post('/', (req, res, next) => {
  School.create(req.body)
    .then(school => res.json(school))
    .catch(next)
});

//delete school
router.delete('/:schoolId', (req, res, next) => {
  School.findById(req.params.schoolId)
    .then(school => school.destroy())
    .catch(next)
});