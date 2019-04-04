const express = require('express');
const config = require('config');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const users = require('./routes/users');
const auth = require('./routes/auth');
const nexmo = require('./routes/nexmo')
const app = express();

// connect to database
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true }, () => {
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

// start server
const PORT = process.env.PORT || 3900
app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));