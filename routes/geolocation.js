const express = require('express')
const { Geolocation } = require('../models/geolocation-model')
const router = express.Router()

router.post('/', async(req, res) => {
  console.log(req.body)
  const geolocation = await new Geolocation({
    geolocation: req.body
  })

  if (!geolocation) res.status(400).status("Something went wrong")

  geolocation.save()
  res.status(200).send(geolocation)
})

module.exports = router