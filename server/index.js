const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const port = process.env.PORT || 8000;

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const groupRoutes = require('./routes/group');
const entryRoutes = require('./routes/entry');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => console.log('Connected to MongoDB'));

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/entry', entryRoutes);

app.get('/', (req, res) => res.send('Hello World'));



app.listen(port, () => {
    console.log(`listening on port ${port}`);
});