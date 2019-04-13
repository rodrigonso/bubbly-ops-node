const express = require('express')
const { Employee } = require('../models/employee-model')
const router = express.Router()

router.get("/", async(req, res) => {
    const employees = await Employee.find().select("-jobs")
    if (!employees) res.status(404).send("No employees found")

    res.send(employees)
})

router.post('/', async(req, res) => {
    const existingEmployee = await Employee.findOne(req.body)
    if (!existingEmployee) res.status(400).send("Employee already exists")

    const newEmployee = await new Employee({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username
    })

    newEmployee.save()
    res.send(newEmployee)
})

module.exports = router