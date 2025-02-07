require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = reuqire('morgan');
const logger = require('./config/logger');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/database');

const authRoutes = require('./routes/auth')
const coinRoutes = require('./routes/coins')

const app = express();
connectDB();

app.use(express.json({ limit: '1mb' }));
app.use(cors());

app.use(morgan('combined', { 
    stream: {
        write: message => logger.info(message.trim())
    }
}));

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

app.use('/api/auth', authRoutes)
app.use('/api/coins', coinRoutes)

app.use(errorHandler);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    logger.info('Server running on http://localhost:${PORT}');
    }).on('error', err => {
        logger.error(`Server failed to start: {err.message}`);
    });
