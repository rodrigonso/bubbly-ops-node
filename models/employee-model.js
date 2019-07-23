const mongoose = require('mongoose')
const { jobSchema } = require('./job-model')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    rating: {
        type: String,
        required: true
    },
    wage: {
        type: Number,
        required: true
    },
    jobInProgress: {
        type: Object,
    }
})

const Employee = new mongoose.model("Employee", employeeSchema)

module.exports.Employee = Employee