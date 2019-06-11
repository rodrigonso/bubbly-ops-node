const mongoose = require('mongoose')

const geolocationSchema = new mongoose.Schema({
  geolocation: {
    type: Object,
    required: true
  }
})

const Geolocation = new mongoose.model('Geolocation', geolocationSchema)

module.exports.Geolocation = Geolocation