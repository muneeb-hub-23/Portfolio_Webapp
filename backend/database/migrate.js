const db = require('./db');

async function migrate() {
  try {
    console.log('Starting database migration...');

    // Create social_links table if not exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS social_links (
        id int NOT NULL AUTO_INCREMENT,
        whatsapp varchar(50) DEFAULT '',
        linkedin varchar(255) DEFAULT '',
        youtube varchar(255) DEFAULT '',
        facebook varchar(255) DEFAULT '',
        updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
    `);
    console.log('✓ social_links table created/verified');

    // Check if social_links has any data
    const [existing] = await db.query('SELECT * FROM social_links');
    if (existing.length === 0) {
      await db.query(
        'INSERT INTO social_links (whatsapp, linkedin, youtube, facebook) VALUES (?, ?, ?, ?)',
        ['', '', '', '']
      );
      console.log('✓ Default social links entry created');
    }

    console.log('\n✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

migrate();
