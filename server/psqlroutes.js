const express = require('express');
const pg = require('pg');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    database: 'postgres'
  }
});

// const User = require('./postgresmodels/Users.sql');
// const Hotel = require('./postgresmodels/Hotels.sql');
// const Review = require('./postgresmodels/Photos.sql');
// const Question = require('./postgresmodels/Questions.sql');
// const Photo = require('./postgresmodels/Reviews.sql');
// const RoomTip = require('./postgresmodels/RoomTips.sql');
// const Answer = require('./postgresmodels/Answers.sql');


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

// router.get('/users', async (req, res) => {
//   const users = await User.find({});
//   res.json(users);
// });

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

// router.get('/users/:id', async (req, res) => {
//   const user = await User.find({ _id: req.params.id });
//   res.json(user);
// });

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

// router.get('/hotels', async (req, res) => {
//   const hotels = await Hotel.find({});
//   res.json(hotels);
// });

/*
    Route:          /api/hotels/random
    Method:         GET
    Description:    Get First Hotel
    Access:         Public
 */

router.get('/hotel', async (req, res) => {
  const hotel = await knex('hotels').where({ _id: 100 });
  res.json(hotel[0]);
});

// router.get('/hotel', async (req, res) => {
//   const hotels = await Hotel.find({});
//   res.json(hotels[0]);
// });

/*
    Route:          /api/hotels/:id/reviews/general
    Method:         GET
    Description:    Get General Reviews For A Hotel
    Access:         Public
 */

router.get('/hotels/:id/reviews/general', async (req, res) => {
  console.log('in reviews general with id');
  const reviews = await knex('reviews').where({ _id: req.params.id }).limit(1);
  const processedreviews = [];
  reviews.forEach((review) => {
    const score = {
      overall: review.rating,
      location: review.ratinglocation,
      cleanliness: review.cleanliness,
      service: review.aservice,
      sleep_quality: review.sleep_quality
    };
    review.ratings = score;
    review.name = review.aname;
    review.date = review.adate;
    review.description = review.adescription;
    review.language = review.alanguage;

    delete review.alanguage;
    delete review.adescription;
    delete review.adate;
    delete review.aname;
    delete review.rating;
    delete review.ratinglocation;
    delete review.cleanliness;
    delete review.aservice;
    delete review.sleep_quality;
    processedreviews.push(review);
  });
  console.log(processedreviews);
  res.json(processedreviews);
});

// router.get('/hotels/:id/reviews/general', async (req, res) => {
//   const reviews = await Review.find({ hotel_id: req.params.id })
//     .populate('user_id')
//     .exec();
//   res.json(reviews);
// });

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

// router.get('/hotels/:id/reviews/photos', async (req, res) => {
//   const photos = await Photo.find({ hotel_id: req.params.id })
//     .populate('user_id')
//     .exec();
//   res.json(photos);
// });

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

// router.get('/hotels/:id/reviews/roomtips', async (req, res) => {
//   const roomTips = await RoomTip.find({ hotel_id: req.params.id })
//     .populate('user_id')
//     .exec();
//   res.json(roomTips);
// });

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

// router.get('/hotels/:id/reviews/questions', async (req, res) => {
//   const questions = await Question.find({ hotel_id: req.params.id })
//     .populate('user_id')
//     .exec();
//   res.json(questions);
// });

/*
    Route:          /api/reviews/general
    Method:         GET
    Description:    Get All General Reviews
    Access:         Public
 */

router.get('/reviews/general', async (req, res) => {
  console.log('in reviews general ');
  const reviews = await knex('reviews').limit(1);
  res.json(reviews);
});

// router.get('/reviews/general', async (req, res) => {
//   const reviews = await Review.find({});
//   res.json(reviews);
// });

/*
    Route:          /api/reviews/general/:id
    Method:         GET
    Description:    Get Single General Review (by ID)
    Access:         Public
 */

router.get('/reviews/general/:id', async (req, res) => {
  console.log('in reviews general id');
  const review = await knex('reviews').where({ _id: req.params.id }).limit(1);
  res.json(review);
});

// router.get('/reviews/general/:id', async (req, res) => {
//   const review = await Review.find({ _id: req.params.id })
//     .populate('hotel_id')
//     .populate('user_id')
//     .exec();
//   res.json(review);
// });

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

// router.get('/reviews/roomtips', async (req, res) => {
//   const roomtips = await RoomTip.find({});
//   res.json(roomtips);
// });

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

// router.get('/reviews/roomtips/:id', async (req, res) => {
//   const roomtip = await RoomTip.find({ _id: req.params.id });
//   res.json(roomtip);
// });

/*
    Route:          /api/reviews/photos
    Method:         GET
    Description:    Get All Photos
    Access:         Public
 */

router.get('/reviews/photos', async (req, res) => {
  const photos = await knex('photos').limit(1);
  res.json(photos);
});

// router.get('/reviews/photos', async (req, res) => {
//   const photos = await Photo.find({});
//   res.json(photos);
// });

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

// router.get('/reviews/photos/:id', async (req, res) => {
//   const photo = await Photo.find({ _id: req.params.id });
//   res.json(photo);
// });

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

// router.get('/reviews/questions', async (req, res) => {
//   const questions = await Question.find({});
//   res.json(questions);
// });

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

// router.get('/reviews/questions/:id', async (req, res) => {
//   const question = await Question.find({ _id: req.params.id });
//   res.json(question);
// });

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

// router.get('/reviews/questions/:id/answers', async (req, res) => {
//   const answers = await Answer.find({ question_id: req.params.id })
//     .populate('user_id')
//     .exec();
//   res.json(answers);
// });

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
// router.get('/reviews/answers', async (req, res) => {
//   const answers = await Answer.find({})
//     .populate('question_id')
//     .exec();
//   res.json(answers);
// });

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

// router.get('/reviews/answers/:id', async (req, res) => {
//   const answer = await Answer.find({ _id: req.params.id })
//     .populate('question_id')
//     .exec();
//   res.json(answer);
// });

module.exports = router;
