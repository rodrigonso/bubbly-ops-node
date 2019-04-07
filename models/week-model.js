const mongoose = require('mongoose')
const Joi = require('joi')

const weekSchema = new mongoose.Schema({
    data: {
        type: Array,
        required: true
    },
    totalDriving: {
        type: Number,
        required: true
    },
    totalHours: {
        type: Number,
        required: true
    },
    totalRevenue: {
        type: Number,
        required: true
    },
    totalServices: {
        type: Number,
        required: true
    },
    range: {
        type: Array,
        required: true
    },
    detailer: {
        type: Object,
        required: true
    }
})

const Week = new mongoose.model('Week', weekSchema);

function validateWeek(week) {
    const schema = {
        data: Joi.array().unique().required(),
        range: Joi.array().unique().required(),
        totalDriving: Joi.number().required(),
        totalRevenue: Joi.number().required(),
        totalHours: Joi.number().required(),
        totalServices: Joi.number().required(),
        detailer: Joi.object().required()
    }

    return Joi.validate(week, schema);
}

module.exports.Week = Week;
module.exports.validate = validateWeek
