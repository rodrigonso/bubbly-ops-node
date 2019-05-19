const express = require('express')
const  { Payroll } = require('../models/payroll-model')
const router = express.Router()

router.get("/", async(req, res) => {
    const payrolls =  await Payroll.find().sort("-date")
    res.send(payrolls)
})

module.exports = router