const express = require('express')
const config = require('config')
const delighted = require('delighted')(config.get('delightedApiKey'))
const router = express.Router()

router.post('/', (req, res) => {
  delighted.person.create({
    email: req.body.email,
  }).then(response => {
    console.log(response)
    res.status(200).send(response)
  })
})

module.exports = router
