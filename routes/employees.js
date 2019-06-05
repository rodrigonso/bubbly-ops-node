const express = require('express')
const { Employee } = require('../models/employee-model')
const router = express.Router()

router.get("/", async(req, res) => {
    const employees = await Employee.find()
    if (!employees) res.status(404).send("No employees found")

    res.send(employees)
})

router.put('/:id', async(req, res) => {
    const existingEmployee = await Employee.findById(req.params.id)
    if (!existingEmployee) res.status(400).send("We did not find employee with given Id")

    Employee.jobInProgress = req.body
    Employee.save()
    res.status(200).send(req.body)
})

router.post('/', async(req, res) => {
    const existingEmployee = await Employee.findOne(req.body)
    if (existingEmployee) res.status(400).send("Employee already exists")

    const newEmployee = await new Employee({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username
    })

    newEmployee.save()
    res.send(newEmployee)
})

module.exports = router