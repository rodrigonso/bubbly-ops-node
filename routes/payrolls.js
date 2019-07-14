const express = require('express')
const  { Payroll } = require('../models/payroll-model')
const router = express.Router()

router.get("/", async(req, res) => {
    const payrolls =  await Payroll.find().sort({ _id: -1 })
    res.send(payrolls)
})

router.post("/", async(req, res) => {
    const { range, employee, totalHours, totalJobs, totalWage, totalTips } = req.body

    // validate req body here

    const newPayroll = await new Payroll({
        range,
        employee,
        totalHours,
        totalTips,
        totalJobs,
        totalWage
    })

    newPayroll.save()
    res.send(newPayroll)
})

router.delete("/:id", async(req, res) => {
    const payroll = await Payroll.findById(req.params.id)
    if (!payroll) res.status(404).send("We did not find this record in the db")

    payroll.delete()
    res.status(200).send("Record was deleted with success!")
})

module.exports = router