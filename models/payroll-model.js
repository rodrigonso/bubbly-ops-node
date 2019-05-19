const mongoose = require("mongoose")

const payrollSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    employee: {
        type: Object,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    total: {
        type: String,
        required: true
    }
})

const Payroll = new mongoose.model("Payroll", payrollSchema)

module.exports.Payroll = Payroll