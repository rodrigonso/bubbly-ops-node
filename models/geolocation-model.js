const mongoose = require('mongoose')

const geolocationSchema = new mongoose.Schema({
  location: {
    type: Object
  }
})

const Gelocation = new mongoose.model('Geolocation', geolocationSchema)

module.exports.Gelocation = Gelocation