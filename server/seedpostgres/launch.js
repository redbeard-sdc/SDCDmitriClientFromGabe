const { seedAnswers } = require('./AnswersCSV');
const { seedReviews } = require('./ReviewsCSV');
const { seedHotels } = require('./HotelsCSV');
const { seedUsers } = require('./UsersCSV');
const { seedRoomTips } = require('./RoomTipsCSV');
const { seedQuestions } = require('./QuestionsCSV');
const { seedPhotos } = require('./PhotosCSV');

const limit = 2000000;
const batchsize = 1000;

//seedHotels(limit, batchsize);
//seedUsers(limit, batchsize);
seedReviews(limit, batchsize);
//seedAnswers(limit, batchsize);
//seedPhotos(limit, batchsize);
//seedQuestions(limit, batchsize);
//seedRoomTips(limit, batchsize);
