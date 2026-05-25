const mongoose = require('mongoose');

const propertySchema =
  new mongoose.Schema({

    title: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    host: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: 'User',

      required: true

    }

  });

module.exports =
  mongoose.model(
    'Property',
    propertySchema
  );