const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const users = require('./routes/users');
const auth = require('./routes/auth');
const nexmo = require('./routes/nexmo')
const employees = require('./routes/employees')
const jobs = require('./routes/jobs')
const services = require('./routes/services')
const payrolls = require('./routes/payrolls')
const sendGrid = require('./routes/sendGrid')
const app = express();

// connect to database
mongoose.connect("mongodb://rodrigo:rodrigo11@ds123635.mlab.com:23635/bubbly-ops", { useNewUrlParser: true }, () => {
    console.log('Connected to MongoDB')
});

// initialize Middleware
app.use(cors());
app.use(helmet())
app.use(express.json());

// initialize Routes
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/sms', nexmo)
app.use('/api/employees', employees)
app.use('/api/jobs', jobs)
app.use('/api/services', services)
app.use('/api/payrolls', payrolls)
app.use('/api/sendGrid', sendGrid)

// start server
const PORT = process.env.PORT || 3900
app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));