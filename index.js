const express = require('express');
const config = require('config');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const users = require('./routes/users');
const auth = require('./routes/auth');
const nexmo = require('./routes/nexmo')
const app = express();

// Connect to database
mongoose.connect(config.get('mongoURI'), { useNewUrlParser: true }, () => {
    console.log('Connected to MongoDB')
});

console.log(process.env.mongoURI);

// Initialize Middleware
app.use(cors());
app.use(helmet())
app.use(express.json());


// Initialize Routes
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/sms', nexmo)

const PORT = process.env.PORT || 3900
app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));