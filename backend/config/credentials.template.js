// CREDENTIALS TEMPLATE
// Copy this file to credentials.js and update with your actual values

module.exports = {
  server: {
    host: 'localhost',
    port: 5000
  },
  database: {
    host: 'localhost',
    user: 'root',                    // Your MySQL username
    password: 'your_password_here',  // Your MySQL password
    database: 'portfolio_db',        // Database name
    port: 3306                       // MySQL port (usually 3306)
  },
  jwt: {
    secret: 'your_jwt_secret_key_here_change_in_production',  // Change this in production!
    expiresIn: '24h'
  }
};
