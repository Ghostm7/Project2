const express = require('express');
const studentController = require('../Controller/studentController');
const router = express.Router();

router.post('/addStudent', studentController.addStudent);
router.get("/getAllstudent", studentController.getAllStudents);
router.get("/getOneStudent/:id", studentController.getOneStudent); // Ensure this route has a callback function
router.patch("/updateStudent/:id", studentController.updateStudent);

module.exports = router;

