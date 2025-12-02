const bcrypt = require('bcryptjs');
const db = require('../database/db');

async function seedDatabase() {
  try {
    console.log('Starting database seed...');

    // Check if admin already exists
    const [existing] = await db.query('SELECT * FROM admin');
    
    if (existing.length > 0) {
      console.log('Admin user already exists. Skipping seed.');
      process.exit(0);
    }

    // Hash the default password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Insert default admin
    await db.query(
      'INSERT INTO admin (username, password) VALUES (?, ?)',
      ['admin', hashedPassword]
    );
    console.log('✓ Admin user created (username: admin, password: admin123)');

    // Insert default profile
    await db.query(
      'INSERT INTO profile (name, description) VALUES (?, ?)',
      ['Your Name', 'Welcome to my portfolio. I am a passionate developer.']
    );
    console.log('✓ Default profile created');

    // Insert default EmailJS config
    await db.query(
      'INSERT INTO emailjs_config (service_id, template_id, public_key, target_email) VALUES (?, ?, ?, ?)',
      ['your_service_id', 'your_template_id', 'your_public_key', 'your_email@example.com']
    );
    console.log('✓ Default EmailJS config created');

    console.log('\n✅ Database seeded successfully!');
    console.log('\nYou can now login with:');
    console.log('  Username: admin');
    console.log('  Password: admin123');
    console.log('\n⚠️  IMPORTANT: Change the password after first login!\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
