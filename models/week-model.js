const mongoose = require('mongoose')
const Joi = require('joi')

const weekSchema = new mongoose.Schema({
    data: {
        type: Array,
        required: true
    },
    range: {
        type: Array,
        required: true
    }
})

const Week = new mongoose.model('Week', weekSchema);

function validateWeek(week) {
    const schema = {
        data: Joi.array().unique().required(),
        range: Joi.array().unique().required(),
    }

    return Joi.validate(week, schema);
}

module.exports.Week = Week;
module.exports.validate = validateWeek
