const express =
  require('express');

const Favorite =
  require('../models/Favorite');

const router =
  express.Router();


// ADD FAVORITE
router.post('/', async (req, res) => {

  try {

    const {
      user,
      property
    } = req.body;

    // CHECK EXISTS
    const existingFavorite =
      await Favorite.findOne({

        user,
        property

      });

    if(existingFavorite){

      return res.status(400).json({

        message:
          'Already Added To Favorites'

      });

    }

    // CREATE FAVORITE
    const newFavorite =
      new Favorite({

        user,
        property

      });

    await newFavorite.save();

    res.status(201).json({

      message:
        'Added To Favorites'

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


// GET USER FAVORITES
router.get('/:userId', async (req, res) => {

  try {

   const favorites =
  await Favorite.find({

    user: req.params.userId

  })

  .populate('property');

const validFavorites =
  favorites.filter((favorite) => {

    return favorite.property;

  });

    res.status(200).json(
      favorites
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


// REMOVE FAVORITE
router.delete('/:id', async (req, res) => {

  try {

    await Favorite.findByIdAndDelete(

      req.params.id

    );

    res.status(200).json({

      message:
        'Removed From Favorites'

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

module.exports = router;