const express =
  require('express');

const Review =
  require('../models/Review');

const router =
  express.Router();


// ADD REVIEW
router.post('/', async (req, res) => {

  try {

    const {
      user,
      property,
      rating,
      comment
    } = req.body;

    // CREATE REVIEW
    const newReview =
      new Review({

        user,

        property,

        rating,

        comment

      });

    await newReview.save();

    res.status(201).json({

      message:
        'Review Added'

    });

  }

  catch(error){

    console.log(error);

    res.status(500).json({

      message:
        'Server Error'

    });

  }

});


// GET PROPERTY REVIEWS
router.get('/:propertyId', async (req, res) => {

  try {

    const reviews =
      await Review.find({

        property:
          req.params.propertyId

      }).populate('user');

    res.status(200).json(
      reviews
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