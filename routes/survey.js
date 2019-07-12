const express = require('express')
const config = require('config')
const router = express.Router()

const delightedApiKey = config.get('delightedApiKey')
const delighted = require('delighted')(delightedApiKey)

router.post('/', (req, res) => {
  console.log(req.body.email)
  delighted.person.create({
    email: req.body.email
  }).then(response => {
    console.log(response)
    res.status(200).send(response)
  })
})

router.post('/response', (req, res) => {
  console.log(req.body)
  res.status(200).send(req.body)
})

module.exports = router
