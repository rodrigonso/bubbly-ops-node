const express = require('express')
const { Week, validate } = require('../models/week-model')
const router = express.Router()

router.post("/", async(req, res) => {
    const { error } = validate(req.body)
    console.log(error)
    if (error) return res.status(400).send("All fields are required")

    const existingWeek = await Week.findOne({ range: req.body.range })
    if (existingWeek) return res.status(400).send("Week has already been validated")

    const week = await new Week({
        data: req.body.data,
        range: req.body.range,
        detailer: req.body.detailer,
        totalDriving: req.body.totalDriving,
        totalHours: req.body.totalHours,
        totalRevenue: req.body.totalRevenue,
        totalServices: req.body.totalServices,
    })

    week.save()
    res.send(week)
})

router.get("/", async(req, res) => {
    const weeks = await Week.find()
    res.send(weeks)
})

module.exports = router