const express = require('express')
const  { Payroll } = require('../models/payroll-model')
const router = express.Router()

router.get("/", async(req, res) => {
    const payrolls =  await Payroll.find().sort("-date")
    res.send(payrolls)
})

router.post("/", async(req, res) => {
    const { range, employee, totalHours, totalJobs, totalWage } = req.body

    // validate req body here

    const newPayroll = await new Payroll({
        range,
        employee,
        totalHours,
        totalJobs,
        totalWage
    })

    newPayroll.save()
    res.send(newPayroll)
})

module.exports = router