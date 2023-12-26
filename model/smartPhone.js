const mongoose = require('mongoose');
const { Schema } = mongoose;

const addMobileModal = new Schema(
    {
        smartphones: [
            {
                name: {
                    type: String,
                    // required: true,
                },
                price: {
                    type: Number,
                    // required: true,
                },
                type: {
                    type: String,
                    enum: ['smartPhone', 'keypadPhone'],
                    required: true,
                    default: 'smartPhone'
                },
                processor: {
                    type: String,
                    enum: ['snapDragon', 'OcataCore', 'Qualcom'],
                    default: 'snapDragon'
                },
                operating_system: {
                    type: String,
                    enum: ['Android', 'Iphone'],
                    required: true,
                    default: 'Android'
                },
                memory: {
                    type: Number,
                    enum: [8, 6],
                    required: true,
                    default: '8'
                },
                image: {
                    type: String,
                    // required: true
                }
            }
        ]
    },
    { timestamps: true }
);

const Mobile = mongoose.model('Mobile', addMobileModal);

module.exports = Mobile;