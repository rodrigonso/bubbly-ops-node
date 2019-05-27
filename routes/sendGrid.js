const express = require('express')
const router = express.Router()
const config = require('config')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(config.get('sendGridApiKey'))

router.post('/payrollDone', (req, res) => {
  const { to, range, totalWage, totalHours, totalTips } = req.body

  const msg = {
    to,
    from: "contact@bubblynow.com",
    subject: "Payroll",
    text: "Your payroll has been run!",
    html: 
      `
      <div>
        <h4>Great News!</h4>
        <p>Congratulations, a new payroll has been submitted for you!</p>
        <br />
        <p>Period: ${range[0]} - ${range[1]}</p>
        <p>Total Tip: $${totalTips}</p>
        <p>Total Hours: ${totalHours}</p>
        <br />
        <strong>Total $${totalWage}</strong>
      </div>
      `
  }
  sgMail.send(msg)
  res.status(200).send(msg)
})  




module.exports = router