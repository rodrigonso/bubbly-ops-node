const express = require('express')
const  { Payroll } = require('../models/payroll-model')
const router = express.Router()

router.get("/", (req, res) => {
    const payrolls = await Payroll.find().sort("-date")
    res.send(payrolls)
})