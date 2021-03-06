const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    }
})

const Service = new mongoose.model('Service', serviceSchema)

module.exports.Service = Service
module.exports.serviceSchema = serviceSchema