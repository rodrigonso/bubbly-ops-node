const mongoose = require("mongoose")

const payrollSchema = new mongoose.Schema({
    range: {
        type: Array,
        required: true
    },
    employee: {
        type: Object,
        required: true
    },
    totalHours: {
        type: Number,
        required: true
    },
    totalTips: {
        type: Number,
        required: true
    },
    totalJobs: {
        type: Number,
        required: true
    },
    totalWage: {
        type: Number,
        required: true
    }
})

const Payroll = new mongoose.model("Payroll", payrollSchema)

module.exports.Payroll = Payroll