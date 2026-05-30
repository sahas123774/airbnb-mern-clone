const express =
  require('express');

const router =
  express.Router();

const {
  GoogleGenerativeAI
} = require(
  '@google/generative-ai'
);

const Property =
  require('../models/Property');

const genAI =
  new GoogleGenerativeAI(

    process.env.GEMINI_API_KEY

  );

router.post(
  '/chat',

  async (req, res) => {

    try {

      const { message } =
        req.body;

      const properties =
        await Property.find();

      const propertyData =
        properties.map(

          (property) => ({

            title:
              property.title,

            location:
              property.location,

            price:
              property.price

          })

        );

      const model =
        genAI.getGenerativeModel({

          model:
            'gemini-1.5-flash'

        });

      const prompt =

        `
You are an Airbnb AI Assistant.

Available Properties:

${JSON.stringify(propertyData)}

User Question:
${message}

Recommend properties only from the available properties list above.
Keep answers short and helpful.
`;

      const result =
        await model.generateContent(
          prompt
        );

      const response =
        result.response.text();

      res.json({

        reply:
          response

      });

    }

    catch(error){

      console.log(error);

      res.status(500).json({

        message:
          'AI Error'

      });

    }

  }

);

module.exports =
  router;