const express = require('express');
const cors = require('cors');
const config = require('./config');

// Import routes
const authRoutes = require('./routes/auth');
const servicesRoutes = require('./routes/services');
const appointmentsRoutes = require('./routes/appointments');
const notificationsRoutes = require('./routes/notifications');
const usersRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(cors({
    origin: '*', // In production, replace with specific origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging (development)
if (config.nodeEnv === 'development') {
    app.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
        next();
    });
}

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'Kandil Dental API',
        version: '1.0.0'
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/users', usersRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'المسار غير موجود'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(err.status || 500).json({
        success: false,
        error: config.nodeEnv === 'development' ? err.message : 'خطأ في الخادم'
    });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
    console.log(`
    ╔═══════════════════════════════════════════════════╗
    ║     🦷 Kandil Dental Center API Started           ║
    ║     Port: ${PORT}                                 ║
    ║     Mode: ${config.nodeEnv}                              ║
    ╚═══════════════════════════════════════════════════╝
    `);
});

module.exports = app;