const express = require('express')
const config = require('config')
const router = express.Router()
const bodyParser = require('body-parser')

const accountSid = config.get('accountSid')
const authToken = config.get('authToken')
const client = require('twilio')(accountSid, authToken)
const MessagingResponse = require('twilio').twiml.MessagingResponse

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/reply', (req, res) => {
    const twiml = new MessagingResponse()

    if (req.body.Body) {
        twiml.message('This is a no reply number. To get in contact with our team please dial +1(832)929-8338.')
    }

    res.send(req.body)
})

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