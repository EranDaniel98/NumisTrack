const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/database');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth')
const coinRoutes = require('./routes/coins')

const app = express();
app.use(errorHandler);
app.use(express.json({ limit: '1mb' }));
app.use(cors());

connectDB();

app.use('/api/auth', authRoutes)
app.use('/api/coins', coinRoutes)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log('Server running on http://localhost:${PORT}'));
