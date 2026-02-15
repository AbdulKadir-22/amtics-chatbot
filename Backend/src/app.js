const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');

// Routes
const chatRoutes = require('./routes/chat.routes');
const adminRoutes = require('./routes/admin.routes');
const guideRoutes = require('./routes/guide.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (Object.keys(req.body).length > 0) {
        console.log('Body:', JSON.stringify(req.body, null, 2));
    }
    next();
});

// API Routes
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/guide', guideRoutes);
app.use('/api/auth', authRoutes);

// Root Route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'College AI Chatbot API is running',
        version: '1.0.0',
    });
});

app.use(errorHandler);

module.exports = app;
