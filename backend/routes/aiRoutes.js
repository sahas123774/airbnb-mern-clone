const express =
  require('express');

const router =
  express.Router();

const OpenAI =
  require('openai');

const Property =
  require('../models/Property');

const Review =
  require('../models/Review');

const openai =
  new OpenAI({

    baseURL:
      'https://openrouter.ai/api/v1',

    apiKey:
      process.env.OPENROUTER_API_KEY

  });


// TEST ROUTE
router.get(
  '/test',

  async (req, res) => {

    try {

      const completion =
        await openai.chat.completions.create({

          model:
            'openai/gpt-3.5-turbo',

          messages: [

            {

              role: 'user',

              content:
                'Say Hello Airbnb User'

            }

          ]

        });

      res.status(200).json({

        reply:

          completion
          .choices[0]
          .message
          .content

      });

    }

    catch(error){

      console.error(
        'TEST ROUTE ERROR:',
        error
      );

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);


// AI CHAT ROUTE
router.post(
  '/chat',

  async (req, res) => {

    try {

      const { message } =
        req.body;

      const properties =
        await Property.find();

      if(properties.length === 0){

        return res.status(200).json({

          reply:
            'No properties available.'

        });

      }

      const propertyInfo = [];

      for(const property of properties){

        const reviews =
          await Review.find({

            property:
              property._id

          });

        let averageRating = 0;

        if(reviews.length > 0){

          const total =
            reviews.reduce(

              (sum, review) =>

                sum + review.rating,

              0

            );

          averageRating =
            (
              total /
              reviews.length
            ).toFixed(1);

        }

        propertyInfo.push(

`Title: ${property.title}
Location: ${property.location}
Price: ₹${property.price}
Rating: ${averageRating}`

        );

      }

      const propertyData =
        propertyInfo.join('\n\n');

      const completion =
        await openai.chat.completions.create({

          model:
            'openai/gpt-3.5-turbo',

          messages: [

            {

              role: 'system',

              content:

`You are an Airbnb AI Assistant.

Available Properties:

${propertyData}

Rules:

1. Recommend ONLY from these properties.
2. If user asks for cheapest property, recommend the lowest priced property.
3. If user asks for best property, recommend the highest rated property.
4. If user asks for properties above a certain rating, filter using ratings.
5. If user asks for a location, recommend matching properties.
6. Never say you don't have access to ratings.
7. Keep responses short and professional.

Always answer in EXACTLY this format:

🏠 Property:
[property title]

📍 Location:
[property location]

💰 Price:
₹[price]

⭐ Rating:
[rating]/5

📝 Why I Recommend It:
[one short sentence]

If multiple properties match, repeat the same format for each property.`

            },

            {

              role: 'user',

              content:
                message

            }

          ]

        });

      res.status(200).json({

        reply:

          completion
          .choices[0]
          .message
          .content

      });

    }

    catch(error){

      console.error(
        'AI CHAT ERROR:',
        error
      );

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);

module.exports =
  router;