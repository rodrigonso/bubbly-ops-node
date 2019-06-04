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

    try {
    	nexmo.message.sendSms(from, to, text);
			res.status(200).send("Your message was sent with success");
		} catch (ex) {
			res.status(400).send(ex)
		}
})

module.exports = router