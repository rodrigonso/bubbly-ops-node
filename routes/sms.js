const express = require('express')
const config = require('config')
const router = express.Router()
const bodyParser = require('body-parser')

const accountSid = config.get('accountSid')
const authToken = config.get('authToken')
const client = require('twilio')(accountSid, authToken)
const MessagingResponse = require('twilio').twiml.MessagingResponse

router.use(bodyParser.urlencoded({ extended: false }))


// automatic reply message
/*
router.post('/reply', (req, res) => {
    const twiml = new MessagingResponse()

    if (req.body.Body) {
        twiml.message('This is a no reply number. To get in contact with our team please dial +1 (832)929-8338.')
    }

    res.writeHead(200, { 'Content-Type': 'text/xml' })
    res.end(twiml.toString())
})
*/

// send ETA text message
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

client.studio.flows('FW2fb69f19c53cfbae1fef5a15f6363caa')
    .executions
    .create({ to: '+18329298338', from: '+12054305370' })
    .then(ex => console.log(ex))


module.exports = router