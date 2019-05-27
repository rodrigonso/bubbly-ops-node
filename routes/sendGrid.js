const express = require('express')
const router = express.Router()
const config = require('config')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(config.get('sendGridApiKey'))

router.post('/payrollDone', (req, res) => {
  const { to, range, totalWage } = req.body

  console.log(to)

  const msg = {
    to,
    from: "contact@bubblynow.com",
    subject: "Payroll",
    text: "Your payroll has been run!",
    html: `<h1>Nice! Your payroll for the period of ${range[0] - range[1]} and total of ${totalWage} has been run.</h1>`
  }
  sgMail.send(msg)
  res.status(200).send(msg)
})  

module.exports = router