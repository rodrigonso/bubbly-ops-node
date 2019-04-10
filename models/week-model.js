const mongoose = require('mongoose')
const Joi = require('joi')

const weekSchema = new mongoose.Schema({
    data: {
        type: Array,
        required: true
    },
    date: {
        type: String,
        required: true,
        unique: true
    }
})

const Week = new mongoose.model('Week', weekSchema);

function validateWeek(week) {
    const schema = {
        data: Joi.array().unique().required(),
        date: Joi.string().unique().requied()
    }

    return Joi.validate(week, schema);
}

module.exports.Week = Week;
module.exports.validate = validateWeek
