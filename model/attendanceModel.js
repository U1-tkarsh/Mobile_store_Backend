const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectModel = new Schema({
    subjectName: {
        type: String,
    },
    totalAttendance: {
        type: Number,
        // required: [true, 'Total Attendance is compulsory']
    },
    currentAttendance: {
        type: Number,
        // required: [true, 'current Attendance is compulsory']
    }
})

const attendanceModel = new Schema(
    {
        subject: {
            type: [String],
        },
        totalAttendance: {
            type: Number,
            // required: [true, 'Total Attendance is compulsory']
        },
        currentAttendance: {
            type: Number,
            // required: [true, 'current Attendance is compulsory']
        }
    },
    { timestamps: true }
);

const Attendance = mongoose.model('Attendance', attendanceModel);

module.exports = Attendance;