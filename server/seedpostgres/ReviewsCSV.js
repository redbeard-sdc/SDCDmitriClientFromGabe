//  reviews
//     -user_id
//     -hotel_id
//     -date
//     -language
//     -title
//     -description
//     -traveler_type
//     - overall
//     - location
//     - cleanliness
//     - service
//     - sleep_quality

const fs = require('fs');
const stringify = require('csv-stringify');
const faker = require('faker');
const {pickEnym,generateRandomNumber, imagesenym} = require("./iterfunctions");



const generateRating = () => {
    const rand = Math.ceil(Math.random() * 10);
    let rating;
  
    if (rand >= 1 && rand < 4) {
      rating = 5;
    } else if (rand >= 4 && rand < 7) {
      rating = 4;
    } else if (rand >= 7 && rand < 9) {
      rating = 3;
    } else if (rand === 9) {
      rating = 2;
    } else {
      rating = 1;
    }
  
    return rating;
  };

const reviewBatch = (batchnum,batchsize,limit) => {
    const data = [];
    for(let i = 0; i < batchsize; i++) {
        const hotel_id = generateRandomNumber(limit);
        const user_id = generateRandomNumber(limit);
        const _id =  batchnum * batchsize + i;
        const username = faker.internet.userName();
        const name = faker.name.findName();
        const city = faker.address.city();
        const state = faker.address.state();
        const date = faker.date.between('2019-02-01', '2019-05-31');
        const title = faker.lorem.words(2);
        const description = faker.lorem.words(2)
        const helpful_votes = faker.random.number(10000);
        const language = pickEnym(["English","Spanish","Dutch","Russian"])
        const rating = generateRating();
        const locationrating = generateRating();
        const cleaninessrating = generateRating();
        const servicerating = generateRating();
        const sleepquality = generateRating();
        const entry = [_id, user_id, hotel_id, username, name, city, state, date, title, description, language, helpful_votes,rating,locationrating, cleaninessrating, servicerating, sleepquality];
        data.push(entry);
    }
    return data;
}

var makebatchpromise = (databatch,batchnum) => {
    return new Promise((resolve,reject) => {
        stringify(databatch,(err,output) => {
            if(err) {
                console.log(`batch ${batchnum} of reviews failed to stringify`);
                resolve();
            } else {
                fs.appendFile('./files/Reviews.csv',output,function(err){
                    if(err){
                        console.log(`batch ${batchnum} of review failed to write`);
                        resolve();
                    } else {
                        console.log(`wrote batch ${batchnum} of reviews`);
                        resolve();
                    }
                });
            }
        });
    });
}

function seedReviews(limit, batchsize){
    var count = limit;
    const dataheader = ['_id', 'user_id', 'hotel_id', 'username', 'name', 'city', 'state', 'date','title', 'description', 'language', 'helpful_votes', 'rating', 'locationrating', 'cleaninessrating', 'servicerating', 'sleepquality\n'];
    fs.writeFile('./files/Reviews.csv', dataheader, function(err){
        if(err){
            console.log('couldnt write header, STOPPING...')
        } else {
            console.log('wrote header')
            async function seeddata(limit, batchsize){
                while(count > 0){
                    const batchnum = Math.floor( (limit-count)/batchsize);
                    const databatch = reviewBatch(batchnum,batchsize,limit);
                    await makebatchpromise(databatch,batchnum)
                    count-=batchsize;
                }
            }
            seeddata(limit,batchsize);
        }
    });
}

module.exports = {seedReviews};