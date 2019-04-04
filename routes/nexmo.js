const express = require('express')
const router = express.Router()
const Nexmo = require('nexmo')

const nexmo = new Nexmo({
    apiKey: process.env.nexmoApiKey,
    apiSecret: process.env.nexmoApiSecret
})


router.post('/', (req, res) => {
    const from = "14352589210"
    const to = req.body.to
    const text = req.body.text

    nexmo.message.sendSms(from, to, text);
    res.send("Your message was sent with success");
})

module.exports = router