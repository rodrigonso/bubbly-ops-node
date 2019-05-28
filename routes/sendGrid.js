const express = require('express')
const router = express.Router()
const config = require('config')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(config.get('sendGridApiKey'))

router.post('/payrollDone', (req, res) => {
  const { to, range, totalWage, totalHours, totalTips, name, totalJobs } = req.body

  

  const msg = {
    to: [to, 'contact@bubblynow.com'] ,
    from: "contact@bubblynow.com",
    subject: "Payroll",
    text: "Your payroll has been run!",
    templateId: "d-3b1e6e2925dc4760a710730e7f62af88",
    dynamic_template_data: {
      totalTips,
      totalHours,
      totalWage,
      totalJobs,
      name,
      start: range[0],
      end: range[1]
    }
  }

  console.log(msg)

  try {
    sgMail.send(msg)
    res.status(200).send(msg)
  }
  catch (ex) {
    console.log(ex)
    res.status(400).send(ex)
  }
})  




module.exports = router