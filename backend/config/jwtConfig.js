// Resolves JWT config from environment variables (Docker/production)
// with fallback to credentials.js for local development.
let credJwt = {};
try {
  const creds = require('./credentials');
  credJwt = creds.jwt || {};
} catch (_) {
  // credentials.js absent — rely entirely on env vars
}

module.exports = {
  secret:    process.env.JWT_SECRET    || credJwt.secret    || 'change_me',
  expiresIn: process.env.JWT_EXPIRES_IN || credJwt.expiresIn || '24h',
};
