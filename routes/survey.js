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

  const employee = await Employee.findById(req.body.event_data.person_properties.employeeId)
  if (!employee) res.status(400).send({ msg: 'No employee with given Id' })

  console.log("Employee:", employee)
  console.log("Rating:", employee.rating)
  console.log("Score", req.body.event_data.score)

  //employee.rating = (employee.rating + req.body.score) / 2
  //employee.save()

  res.status(200).send()
})

module.exports = router
