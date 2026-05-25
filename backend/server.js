const express =
  require('express');

const mongoose =
  require('mongoose');

const cors =
  require('cors');

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


// MIDDLEWARES
app.use(cors());

app.use(express.json());


// STATIC FOLDER
app.use(

  '/uploads',

  express.static('uploads')

);


// ROUTES
app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/properties',
  propertyRoutes
);

app.use(
  '/api/bookings',
  bookingRoutes
);

app.use(
  '/api/favorites',
  favoriteRoutes
);

app.use(
  '/api/reviews',
  reviewRoutes
);


// TEST ROUTE
app.get('/', (req, res) => {

  res.send('API Running');

});


// PORT
const Port =
  process.env.PORT || 5000;


// DATABASE CONNECTION
mongoose.connect(

  process.env.MONGO_URI

)

.then(() => {

  console.log(
    'MongoDB Connected'
  );

  app.listen(Port, () => {

    console.log(

      `Server Running at Port ${Port}`

    );

  });

})

.catch((error) => {

  console.log(error);

});