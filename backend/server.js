const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/credentials');

const app = express();

// Prioritize IIS provided port and host, fallback to config/defaults
const PORT = process.env.PORT || process.env.IISNODE_PORT || config.server.port || 5000;
const HOST = process.env.HOST || process.env.IISNODE_HOST || config.server.host || 'localhost';

// Middleware
const allowedOrigins = [
  "https://muneebbaig.info",
  "https://www.muneebbaig.info"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, curl, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true // only if you use cookies/auth
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/api/uploads', express.static('uploads'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio Backend Server is running!',
    status: 'success',
    port: PORT,
    apiEndpoint: '/api'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/emailjs', require('./routes/emailjs'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/settings', require('./routes/settings'));

// Start server
const startServer = async () => {
  try {
    app.listen(PORT, HOST, () => {
      console.log(`🚀 Server is running on ${HOST}:${PORT}`);
      console.log(`📍 Server URL: http://${HOST}:${PORT}`);
      
      // Log environment info for IIS deployment
      if (process.env.IISNODE_PORT || process.env.PORT) {
        console.log('🌐 Running in IIS/hosted environment');
        console.log(`   - PORT source: ${process.env.PORT ? 'PORT' : process.env.IISNODE_PORT ? 'IISNODE_PORT' : 'config'}`);
        console.log(`   - HOST source: ${process.env.HOST ? 'HOST' : process.env.IISNODE_HOST ? 'IISNODE_HOST' : 'config'}`);
      } else {
        console.log('💻 Running in local development environment');
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
});

// Start the application
startServer();
