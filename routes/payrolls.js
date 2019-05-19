const express = require('express')
const  { Payroll } = require('../models/payroll-model')
const router = express.Router()

router.get("/", (req, res) => {
    const payrolls =  Payroll.find().sort("-date")
    res.send(payrolls)
})

module.exports = router