//4) Start server
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

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

// const testTour = new Tour({
//   name: 'The Kanchanjanga Trek',
//   price: 1000,
//   rating: 5,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR: ', err.message);
//   });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App running on 3000...`);
});
