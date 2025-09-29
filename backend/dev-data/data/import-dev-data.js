const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Boot = require('../../models/bootModel');
const Kit = require('../../models/kitModel');

// Load environment variables
dotenv.config({ path: './config.env' });

// Connect to MongoDB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB, {}).then(() => console.log('DB connection succesfull'));

// Read JSON files
// eslint-disable-next-line no-undef
const Boots = JSON.parse(fs.readFileSync(`${__dirname}/Boots.json`, 'utf-8'));
// eslint-disable-next-line no-undef
const Kits = JSON.parse(fs.readFileSync(`${__dirname}/kits.json`, 'utf-8'));

// Import data into DB
const importData = async () => {
  try {
    await Boot.create(Boots);
    console.log('Boots data successfully loaded');

    await Kit.create(Kits);
    console.log('Kits data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await Boot.deleteMany();
    console.log('Data successfully deleted');
    await Kit.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);
