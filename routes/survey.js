const express = require('express')
const { Employee } = require('../models/employee-model')
const config = require('config')
const router = express.Router()

const delightedApiKey = config.get('delightedApiKey')
const delighted = require('delighted')(delightedApiKey)

router.post('/', (req, res) => {
  console.log(req.body)
  delighted.person.create({
    email: req.body.email,
    properties: {
      employeeId: req.body.employeeId,
      serviceId: req.body.serviceId
    }
  }).then(response => {
    console.log(response)
    res.status(200).send(response)
  })
})

router.post('/response', async(req, res) => {
  console.log(req.body)

  const employee = await Employee.findById(req.body.properties.employeeId)
  if (!employee) res.status(400).send({ msg: 'No employee with given Id' })

  employee.rating = (employee.rating + req.body.score) / 2
  employee.save()

  console.log(req.body, employee)
  res.status(200).send(req.body, employee)
})

module.exports = router
