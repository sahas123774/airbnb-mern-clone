const express =
  require('express');

const Booking =
  require('../models/Booking');

const router =
  express.Router();


// CREATE BOOKING
router.post('/', async (req, res) => {

  try {

    const {
      user,
      property,
      checkIn,
      checkOut
    } = req.body;

    // FIND PROPERTY
    const Property =
      require('../models/Property');

    const foundProperty =
      await Property.findById(
        property
      );

    // CHECK EXISTING BOOKINGS
    const existingBooking =
      await Booking.findOne({

        property,

        $or: [

          {

            checkIn: {
              $lte: checkOut
            },

            checkOut: {
              $gte: checkIn
            }

          }

        ]

      });

    // IF BOOKED
    if(existingBooking){

      return res.status(400).json({

        message:
          'Property already booked for selected dates'

      });

    }

    // CALCULATE DAYS
    const startDate =
      new Date(checkIn);

    const endDate =
      new Date(checkOut);

    if(endDate<=startDate){
      return res.status(400).json({
        message:'invalid booking dates'
      });
    }

    const timeDifference =
      endDate - startDate;

    const days =
      timeDifference /
      (1000 * 60 * 60 * 24);

    // TOTAL PRICE
    const totalPrice =
      days * foundProperty.price;

    // CREATE BOOKING
    const newBooking =
      new Booking({

        user,

        property,

        checkIn,

        checkOut,

        totalPrice

      });

    await newBooking.save();

    res.status(201).json({

      message:
        'Booking Successful'

    });

  }

  catch(error){

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

});


// GET USER BOOKINGS
// GET USER BOOKINGS
router.get('/:userId', async (req, res) => {

  try {

    const bookings =
      await Booking.find({

        user: req.params.userId

      })

      .populate('property');

    const validBookings =
      bookings.filter((booking) => {

        return booking.property;

      });

    res.status(200).json(

      validBookings

    );

  }

  catch(error){

    console.log(error);

    res.status(500).json({

      message:
        'Server Error'

    });

  }

});

// CANCEL BOOKING
router.delete('/:id', async (req, res) => {

  try {

    await Booking.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      message:
        'Booking Cancelled'

    });

  }

  catch(error){

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

});

// BOOKINGS OF PROPERTY
router.get('/property/:propertyId', async (req, res) => {

  try {

    const bookings =
      await Booking.find({

        property:
          req.params.propertyId

      });

    res.status(200).json(
      bookings
    );

  }

  catch(error){

    console.log(error);

    res.status(500).json({

      message:
        'Server Error'

    });

  }

});

module.exports = router;