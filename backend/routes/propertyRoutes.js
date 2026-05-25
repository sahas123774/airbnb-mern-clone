const express = require('express');

const Property =
  require('../models/Property');

const router = express.Router();

const upload =
  require('../middleware/upload');

const cloudinary =
  require('../config/cloudinary');


// GET ALL PROPERTIES
router.get('/', async (req, res) => {

  try {

    const {
      location,
      minPrice,
      maxPrice
    } = req.query;

    // FILTER OBJECT
    let filter = {};

    // LOCATION SEARCH
    if(location){

      filter.location = {

        $regex: location,

        $options: 'i'

      };

    }

    // PRICE FILTER
    if(minPrice || maxPrice){

      filter.price = {};

      if(minPrice){

        filter.price.$gte =
          Number(minPrice);

      }

      if(maxPrice){

        filter.price.$lte =
          Number(maxPrice);

      }

    }

    // FETCH FILTERED PROPERTIES
    const properties =
      await Property.find(filter);

    res.status(200).json(
      properties
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

// GET SINGLE PROPERTY
router.get('/:id', async (req, res) => {

  try {

    const property =
      await Property.findById(
        req.params.id
      );

    res.status(200).json(
      property
    );

  }

  catch(error){

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

});


// ADD PROPERTY
router.post(

  '/',

  upload.single('image'),

  async (req, res) => {

    try {

      const {
        title,
        location,
        price,
        host
      } = req.body;

      // UPLOAD TO CLOUDINARY
      const result =
        await cloudinary.uploader.upload(

          req.file.path

        );

      // CREATE PROPERTY
      const newProperty =
        new Property({

          title,

          location,

          price,

          image: result.secure_url,

          host

        });

      await newProperty.save();

      res.status(201).json({

        message:
          'Property Added Successfully'

      });

    }

    catch(error){

      console.log(error);

      res.status(500).json({
        message: 'Server Error'
      });

    }

  }

);

// UPDATE PROPERTY
router.put(

  '/:id',

  upload.single('image'),

  async (req, res) => {

    try {

      const {
        title,
        location,
        price
      } = req.body;

      // FIND PROPERTY
      const property =
        await Property.findById(
          req.params.id
        );

      // UPDATE IMAGE IF NEW FILE
      let imageUrl =
        property.image;

      if(req.file){

        const result =
          await cloudinary.uploader.upload(

            req.file.path

          );

        imageUrl =
          result.secure_url;

      }

      // UPDATE PROPERTY
      const updatedProperty =
        await Property.findByIdAndUpdate(

          req.params.id,

          {

            title,

            location,

            price,

            image: imageUrl

          },

          {
            new: true
          }

        );

      res.status(200).json({

        message:
          'Property Updated',

        updatedProperty

      });

    }

    catch(error){

      console.log(error);

      res.status(500).json({
        message: 'Server Error'
      });

    }

  }

);

// DELETE PROPERTY
router.delete('/:id', async (req, res) => {

  try {

    await Property.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        'Property Deleted'
    });

  }

  catch(error){

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

});

// HOST PROPERTIES
router.get('/host/:hostId', async (req, res) => {

  try {

    const properties =
      await Property.find({

        host:
          req.params.hostId

      });

    res.status(200).json(
      properties
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