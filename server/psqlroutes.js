const express = require('express');
const pg = require('pg');
const { knex, redisClient } = require('./config');

redisClient.on('error', (err) => {
  console.log('error', err);
});

const rediscache = (req, res, next) => {
  // console.log('in cache');
  const id = req.params.id;
  redisClient.get(`${id}`, (err, results) => {
    if (err) {
      console.log(err);
    } else if (results !== null) {
      return res.json(JSON.parse(results));
    } else {
      next();
    }
  });
};

const router = express.Router();

/*
    Route:          /api/users
    Method:         GET
    Description:    Get All Users
    Access:         Public
 */

router.get('/users', async (req, res) => {
  const users = await knex('users').limit(10);
  res.json(users);
});

/*
    Route:          /api/hotels/:id
    Method:         GET
    Description:    Get Single User
    Access:         Public
 */

router.get('/users/:id', async (req, res) => {
  const user = await knex('users').where({ _id: req.params.id });
  res.json(user);
});

/*
    Route:          /api/hotels
    Method:         GET
    Description:    Get All Hotels
    Access:         Public
 */

router.get('/hotels', async (req, res) => {
  const hotels = await knex('hotels').limit(10);
  res.json(hotels);
});

/*
    Route:          /api/hotels/random
    Method:         GET
    Description:    Get First Hotel
    Access:         Public
 */


router.get('/hotel', async (req, res) => {
  const id = 1000;
  let hotel = await knex('hotels').where({ _id: id });
  hotel = hotel[0];
  hotel.description = hotel.adescription;
  hotel.name = hotel.aname;
  hotel.url = hotel.aurl;
  hotel.address = {
    street: hotel.street,
    city: hotel.city,
    state: hotel.astate,
    zipcode: hotel.zip,
    county: hotel.country
  };
  delete hotel.adescription;
  delete hotel.aname;
  delete hotel.aurl;
  delete hotel.street;
  delete hotel.city;
  delete hotel.astate;
  delete hotel.zipcode;
  delete hotel.country;

  // redisClient.set(id, JSON.stringify(hotel), 'EX', 3600);
  res.json(hotel);
});

/*
    Route:          /api/hotels/:id/reviews/general
    Method:         GET
    Description:    Get General Reviews For A Hotel
    Access:         Public
 */

router.get('/hotels/:id/reviews/general', rediscache, async (req, res) => {
  console.log('hi in general reviews route');
  const reviews = await knex('users').select(
    'reviews._id as _id',
    'reviews.adate as date',
    'reviews.alanguage as language',
    'reviews.title as title',
    'reviews.adescription as description',
    'reviews.rating as overall',
    'reviews.ratinglocation as location',
    'reviews.cleanliness as cleanliness',
    'reviews.aservice as service',
    'reviews.sleep_quality as sleep_quality',
    'users.username as username',
    'users.personname as name',
    'users.astate as state',
    'users.city as city',
    'users.contributions as contributions',
    'users.helpful_votes as helpful_votes'
  ).innerJoin('reviews', 'reviews.user_id', 'users._id').limit(20);
  const processedreviews = reviews.map((review) => {
    let cleanReview = {
      _id: review._id,
      date: new Date(parseInt(review.date, 10)),
      language: review.language,
      title: review.title,
      description: review.description,
      ratings: {
        overall: review.overall,
        location: review.location,
        cleanliness: review.cleanliness,
        service: review.service,
        sleep_quality: review.sleep_quality
      },
      user_id: {
        username: review.username,
        name: {
          first_name: review.name.split(' ')[0],
          last_name: review.name.split(' ')[1]
        },
        location: {
          city: review.city,
          state: review.state
        },
        helpful_votes: review.helpful_votes,
        contributions: review.contributions
  
      },
      helpful_votes: parseInt(review.helpful_votes),
    };
    return cleanReview;
  });
  redisClient.set(req.params.id, JSON.stringify(processedreviews), 'EX', 3600);
  res.json(processedreviews);
});

/*
    Route:          /api/hotels/:id/reviews/photos
    Method:         GET
    Description:    Get Review Photos For A Hotel
    Access:         Public
 */

router.get('/hotels/:id/reviews/photos', async (req, res) => {
  const photos = await knex('photos').where({ hotel_id: req.params.id }).limit(1);
  res.json(photos);
});

/*
    Route:          /api/hotels/:id/reviews/roomtips
    Method:         GET
    Description:    Get Room Tips For A Hotel
    Access:         Public
 */

router.get('/hotels/:id/reviews/roomtips', async (req, res) => {
  const roomTips = await knex('roomtips').where({ hotel_id: req.params.id }).limit(1);
  res.json(roomTips);
});

/*
    Route:          /api/hotels/:id/reviews/questions
    Method:         GET
    Description:    Get Q & A For A Hotel
    Access:         Public
*/

router.get('/hotels/:id/reviews/questions', async (req, res) => {
  const questions = await knex('questions').where({ hotel_id: req.params.id }).limit(1);
  res.json(questions);
});

/*
    Route:          /api/reviews/general
    Method:         GET
    Description:    Get All General Reviews
    Access:         Public
 */

router.get('/reviews/general', async (req, res) => {
  const reviews = await knex('reviews').limit(1);
  res.json(reviews);
});

/*
    Route:          /api/reviews/general/:id
    Method:         GET
    Description:    Get Single General Review (by ID)
    Access:         Public
 */

router.get('/reviews/general/:id', async (req, res) => {
  const review = await knex('reviews').where({ _id: req.params.id }).limit(1);
  res.json(review);
});

/*
    Route:          /api/reviews/roomtips
    Method:         GET
    Description:    Get All Room Tips
    Access:         Public
 */

router.get('/reviews/roomtips', async (req, res) => {
  const roomtips = await knex('roomtips').limit(1);
  res.json(roomtips);
});

/*
    Route:          /api/reviews/roomtips/:id
    Method:         GET
    Description:    Get Single Room Tip (by ID)
    Access:         Public
 */

router.get('/reviews/roomtips/:id', async (req, res) => {
  const roomtip = await knex('roomtips').where({ _id: req.params.id }).limit(1);
  res.json(roomtip);
});

/*
    Route:          /api/reviews/photos
    Method:         GET
    Description:    Get All Photos
    Access:         Public
 */

router.get('/reviews/photos', async (req, res) => {
  const photos = await knex('photos').limit(1);
  // processedphotos = [];
  // photos.forEach((photo) => {
  //   const { user_id } = photo;
  //   const await knex('users').where({ _id: user_id });
  // });
  res.json(photos);
});

/*
    Route:          /api/reviews/photos/:id
    Method:         GET
    Description:    Get Single Photo (by ID)
    Access:         Public
 */

router.get('/reviews/photos/:id', async (req, res) => {
  const photo = await knex('photos').where({ _id: req.params.id }).limit(1);
  res.json(photo);
});

/*
    Route:          /api/reviews/questions
    Method:         GET
    Description:    Get All Questions
    Access:         Public
 */

router.get('/reviews/questions', async (req, res) => {
  const questions = await knex('questions').limit(1);
  res.json(questions);
});

/*
    Route:          /api/reviews/questions/:id
    Method:         GET
    Description:    Get Single Question (by ID)
    Access:         Public
 */

router.get('/reviews/questions/:id', async (req, res) => {
  const question = await knex('questions').where({ _id: req.params.id }).limit(1);
  res.json(question);
});

/*
    Route:          /api/reviews/questions/:id/answers
    Method:         GET
    Description:    Get List of Answers Per Question
    Access:         Public
 */

router.get('/reviews/questions/:id/answers', async (req, res) => {
  const answers = await knex('questions').where({ _id: req.params.id }).limit(1);
  res.json(answers);
});

/*
    Route:          /api/reviews/answers
    Method:         GET
    Description:    Get All Hotels
    Access:         Public
 */

router.get('/reviews/answers', async (req, res) => {
  const answers = await knex('answers').limit(1);
  res.json(answers);
});

/*
    Route:          /api/reviews/answers/:id
    Method:         GET
    Description:    Get Single Answer (by ID)
    Access:         Public
 */

router.get('/reviews/answers/:id', async (req, res) => {
  const answer = await knex('answers').where({ _id: req.params.id }).limit(1);
  res.json(answer);
});

module.exports = router;
