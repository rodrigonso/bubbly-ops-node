const express = require('express')
const { Employee } = require('../models/employee-model')
const { Job } = require('../models/job-model')
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

router.get('/rating/:employeeId', async(req, res) => {

  const employee = await Employee.findById(req.param.employeeId)
  if (!employee) res.status(400).send({ msg: 'No employee with given Id' })

  const { rating } = await delighted.metrics.retrieve({ trend: "119223" })
  employee.rating = rating
  employee.save()
  res.status(200).send(employee)
})

module.exports = router
