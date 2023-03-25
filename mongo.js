const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const fs = require('fs');
const path = require('path');

const Tour = require('./models/tourModel');

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

function mongoConnect() {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}
mongoConnect();

//READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, 'dev-data', 'data', 'tours-simple.json'),
    'utf-8'
  )
);
// console.log(tours);

//ADD JSON DATA
async function importData() {
  try {
    await Tour.create(tours);
    console.log('Data loaded successfully...');
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
}

//DELETE OLD DATA FROM DB
async function deleteData() {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully');
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
}

// deleteData();
// importData();
// console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

module.exports = {
  mongoConnect,
};
