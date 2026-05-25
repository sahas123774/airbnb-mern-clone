const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes =
  require('./routes/authRoutes');

const propertyRoutes =
  require('./routes/propertyRoutes');

const bookingRoutes =
  require('./routes/bookingRoutes');

const favoriteRoutes =
  require('./routes/favoriteRoutes');

const reviewRoutes =
  require('./routes/reviewRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/properties',propertyRoutes);
app.use('/api/bookings',bookingRoutes);
app.use('/api/favorites',favoriteRoutes);
app.use('/api/reviews',reviewRoutes);

app.get('/', (req, res) => {
  res.send('API Running');
});

const Port=5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log('MongoDB Connected');

  app.listen(Port, () => {

  console.log(`Server Running at http://localhost:${Port}`);

});

})
.catch((error) => {
  console.log(error);
});