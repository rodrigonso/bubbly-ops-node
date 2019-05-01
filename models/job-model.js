const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    isCompleted: {
        type: Boolean,
        default: false
    },
    distances: {
        type: Object,
        required: true
    },
    vehicleType: {
        type: Object,
        required: true
    },
    serviceType: {
        type: Object,
        required: true,
    },
    upgrades: {
        type: Array,
        required: true
    },
    jobData: {
        type: Object,
        required: true
    },
    employeeId: {
        type: String,
    }
})

const Job = new mongoose.model('Job', jobSchema)

module.exports.Job = Job
module.exports.jobSchema = jobSchema