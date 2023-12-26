const express = require('express');
const {dynamicAttendance, addSubject, updateSubject, getSubject, deleteAllSubject, deleteSingleSubject, updateSingleSubject} = require('../controller/attendanceController');
const { isAdmin } = require('../middleware/auth');
const router = express.Router();


router.post('/addSubject', addSubject);

router.get('/getSubject', getSubject);

router.put('/updateSubject/:id', updateSubject);
router.put('/dynamicAttendance/:id', dynamicAttendance);
router.put('/updateSingleSubject/:id', updateSingleSubject);

router.delete('/deleteAllSubject/:id', deleteAllSubject);
router.delete('/deleteSingleSubject/:id', deleteSingleSubject);

module.exports = router;