const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => console.log('Connected to MongoDB'));

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});



app.listen(5000, () => {
    console.log('listening on port 5000');
});