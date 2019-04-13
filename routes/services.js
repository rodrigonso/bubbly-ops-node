const express = require('express')
const { Service } = require("../models/service-model")
const router = express.Router()

router.get("/", async(req, res) => {
    const services = await Service.find()
    res.send(services)
})

router.post('/', async(req, res) => {
    const newService = await new Service({
        name: req.body.name,
        duration: req.body.duration,
        price: req.body.price,
        vehicleType: req.body.vehicleType
    })

    newService.save()
    res.send(newService)
})

module.exports = router