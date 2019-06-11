const express = require('express')
const { Gelocation } = require('../models/geolocation-model')
const router = express.Router()

router.post('/', async(req, res) => {
  const geolocation = new Gelocation({
    location: req.body
  })

  geolocation.save()
  res.status(200).send(geolocation)
})