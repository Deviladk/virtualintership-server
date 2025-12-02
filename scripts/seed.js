require('dotenv').config();
const connectDB = require('../config/database');
const { seedAll } = require('../utils/seedData');

// Connect to database
connectDB();

// Seed the database
seedAll()
  .then(() => {
    console.log('Seeding process completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding process failed:', error);
    process.exit(1);
  });


