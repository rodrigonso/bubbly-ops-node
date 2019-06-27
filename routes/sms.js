const express = require('express')
const config = require('config')
const router = express.Router()

const accountSid = config.get('accountSid')
const authToken = config.get('authToken')
const client = require('twilio')(accountSid, authToken)

router.post('/', (req, res) => {
    client.messages.create({
        body: req.body.text,
        from: '+12054305370',
        to: req.body.to
    })
    .then(message => {
        console.log(message)
        res.status(200).send(message)
    })
    .catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
})

module.exports = router