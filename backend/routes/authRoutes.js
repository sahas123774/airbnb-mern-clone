const express = require('express');

const bcrypt = require('bcryptjs');

const User = require('../models/user');

const router = express.Router();

router.post('/signup', async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role
    } = req.body;

    // CHECK USER EXISTS
    const existingUser =
      await User.findOne({ email });

    if(existingUser){

      return res.status(400).json({
        message: 'User already exists'
      });

    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 12);

    // CREATE USER
    const newUser = new User({

      name,
      email,
      password: hashedPassword,
      role

    });

    // SAVE USER
    await newUser.save();

    res.status(201).json({
      message: 'User Registered Successfully'
    });

  }

  catch(error){

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

});

const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    // CHECK USER EXISTS
    const user =
      await User.findOne({ email });

    if(!user){

      return res.status(400).json({
        message: 'Invalid Credentials'
      });

    }

    // COMPARE PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if(!isMatch){

      return res.status(400).json({
        message: 'Invalid Credentials'
      });

    }

    // CREATE JWT TOKEN
    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: '7d'
      }

    );

    res.status(200).json({

      message: 'Login Successful',

      token,

      userId: user._id,
      
      role:user.role

    });

  }

  catch(error){

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

});

module.exports = router;