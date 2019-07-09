const express = require('express');
const config = require('config')
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const users = require('./routes/users');
const auth = require('./routes/auth');
const sms = require('./routes/sms')
const employees = require('./routes/employees')
const jobs = require('./routes/jobs')
const services = require('./routes/services')
const payrolls = require('./routes/payrolls')
const sendGrid = require('./routes/sendGrid')
const survey = require('./routes/survey')
const app = express();

// connect to database
const mongoURI = config.get('mongoURI')
mongoose.connect(mongoURI, { useNewUrlParser: true }, () => {
    console.log('Connected to MongoDB')
});

// initialize Middleware
app.use(cors());
app.use(helmet())
app.use(express.json());

// initialize Routes
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/sms', sms)
app.use('/api/employees', employees)
app.use('/api/jobs', jobs)
app.use('/api/services', services)
app.use('/api/payrolls', payrolls)
app.use('/api/sendGrid', sendGrid)
app.use('/api/survey', survey)

// start server
const PORT = process.env.PORT || 3900
app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));