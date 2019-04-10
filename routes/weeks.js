const express = require('express')
const { Week, validate } = require('../models/week-model')
const router = express.Router()

router.post("/", async(req, res) => {
    const { error } = validate(req.body)
    console.log(error)
    if (error) return res.status(400).send("All fields are required")

    const existingWeek = await Week.findOne({ _id: req.body._id })
    if (existingWeek) return res.status(400).send("Week has already been validated")

    const week = await new Week({
        data: req.body.data,
        date: req.body.data

    })

    await week.save()
    res.send(week)
})

router.get("/", async(req, res) => {
    const weeks = await Week.find()
    res.send(weeks)
})

router.delete("/:id", async(req, res) => {
    console.log(req.params)
    const week = await Week.findById(req.params.id)
    console.log(week)
    if (!week) return res.status(404).send("We haven't found the requested item")

     week.remove()
     await week.save()
     res.send("Item was deleted with success!")
})

module.exports = router