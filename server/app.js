require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require("helmet");

const { globalLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/database');
const logger = require('./config/logger');
const authRoutes = require('./routes/auth');
const coinRoutes = require('./routes/coins');

const app = express();
connectDB();

app.use(express.json({ limit: '1mb' }));
app.use(helmet());
app.use(cors());

app.use(morgan('combined', {
    stream: { write: message => logger.info(message) }
}));

app.use(globalLimiter); // Apply global rate limiting

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/coins', coinRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
}).on('error', err => {
    logger.error(`Server failed to start: ${err.message}`);
});
