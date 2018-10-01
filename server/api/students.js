//routes for students
const router = require('express').Router();
const { models } = require('../db');
const { Student, School } = models;

module.exports = router;

// /students
router.get('/', (req, res, next) => {
  Student.findAll({
    include : [ School ]
  })
    .then(students => res.json(students))
    .catch(next)
});

// /students/:studentId
router.get('/:studentId', (req, res, next) => {
  Student.findOne({
    where : { id : req.params.studentId },
    include : [ School ]
  })
    .then(student => res.json(student))
    .catch(next)
});

//create student
router.post('/', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.json(student))
    .catch(next)
});

//update student
router.put('/:studentId', (req, res, next) => {
  Student.findById(req.params.studentId)
    .then(student => student.update(req.body))
    .catch(next)
});

//delete student
router.delete('/:studentId', (req, res, next) => {
  Student.findById(req.params.studentId)
    .then(student => student.destroy())
    .catch(next)
});

