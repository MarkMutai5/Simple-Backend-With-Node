const express = require("express");
const students = require("../../studentsData");
const router = express.Router();
const uuid = require('uuid')

//get all
router.get('/', (req, res) => {
  res.json(students);
});

//get single students
router.get('/:id', (req, res) => {
  const found = students.some(
    (student) => student.id === parseInt(req.params.id)
  );

  if (found) {
    res.json(
      students.filter((student) => student.id === parseInt(req.params.id))
    );
  } else {
    res.status(404).json({ message: "Entry Not Found", status: 404 });
  }
});

//create
router.post('/', (req, res) => {
    const newStudent = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if( !req.body.name || !req.body.email){
        return res.status(400).json({
            message: "Bad Request",
            status: 400
        })
    }
    else{
        students.push(newStudent)
        return res.status(201).json({
            message: "Created Successfully",
            status: 201
        })
    }

})

//updating a student

router.put('/:id', (req, res) => {
    const found = students.some(
      (student) => student.id === parseInt(req.params.id)
    );
  
    if (found) {
      const updateStudent = req.body
      students.forEach( student => {
        if(student.id === parseInt(req.params.id)){
            student.name = updateStudent.name ? updateStudent.name : student.name
            student.email = updateStudent.email ? updateStudent.email : student.email

            res.json({message : 'Student Created Suuccessfully'})
        }})
    } else {
      res.status(404).json({ message: "Entry Not Found", status: 404 });
    }
  });

//deleting
router.delete('/:id', (req, res) => {
    const found = students.some(
      (student) => student.id === parseInt(req.params.id)
    );
  
    if (found) {
      res.json(
        students.filter((student) => student.id !== parseInt(req.params.id))
      );
    } else {
      res.status(404).json({ message: "Entry Not Found", status: 404 });
    }
  });

module.exports = router;
