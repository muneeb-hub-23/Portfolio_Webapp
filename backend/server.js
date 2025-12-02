const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/credentials');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/emailjs', require('./routes/emailjs'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
const PORT = config.server.port || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://${config.server.host}:${PORT}`);
});
