const express = require('express')
const config = require('config')
const router = express.Router()
const Nexmo = require('nexmo')

const nexmo = new Nexmo({
    apiKey: config.get("nexmoApiKey"),
    apiSecret: config.get("nexmoApiSecret")
})


router.post('/', (req, res) => {
    const from = "14352589210"
    const to = req.body.to
    const text = req.body.text

    nexmo.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        } else {
            if (responseData.messages[0]['status'] === '0') {
                console.log("Message sent successfully.")
                res.status(200).send("Message sent successfully.")
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`)
                res.status(400).send(`Message failed with error: ${responseData.messages[0]['error-text']}`)
            }
        }
    })
})

module.exports = router