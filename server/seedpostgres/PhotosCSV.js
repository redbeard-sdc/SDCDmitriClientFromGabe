//  photos
//      - _id
//      - hotel_id
//      - user_id
//      - url
//      - date
//      - description
//      - likes
//      - category


const fs = require('fs');
const stringify = require('csv-stringify')
const faker = require('faker');
const { pickEnym, generateRandomNumber, imagesenym } = require('./iterfunctions');


const photoBatch = (batchnum, batchsize, limit) => {
    const data = [];
    for(let i = 0; i < batchsize; i++) {
        const hotel_id = generateRandomNumber(limit);
        const user_id = generateRandomNumber(limit);
        const _id = batchnum * batchsize + i;
        const url = pickEnym(imagesenym);
        const date = faker.date.between('2019-02-01', '2019-05-31');
        const description = faker.lorem.words(2);
        const likes = generateRandomNumber(10000);
        const category = pickEnym([
            'Traveler',
            'Room & Suite',
            'Dining',
            'Pool & Beach',
            'Business Center & Event Rooms',
            'Family and Play Areas',
        ]);
        const entry = [_id, hotel_id, user_id, url, date, description, likes, category];
        data.push(entry);
    }
    return data;
}

var makebatchpromise = (databatch,batchnum) => {
    return new Promise((resolve,reject) => {
        stringify(databatch,(err,output) => {
            if(err) {
                console.log(`batch ${batchnum} of photos failed to stringify`);
                resolve();
            } else {
                fs.appendFile('./files/Photos.csv',output,function(err){
                    if(err){
                        console.log(`batch ${batchnum} of photos failed to write`);
                        resolve();
                    } else {
                        console.log(`wrote batch ${batchnum} of photos`);
                        resolve();
                    }
                });
            }
        });
    });
}

function seedPhotos(limit, batchsize){
    var count = limit;
    const dataheader = ['_id', 'hotel_id', 'user_id', 'url', 'date', 'description', 'likes', 'catagory\n']
    fs.writeFile('./files/Photos.csv', dataheader, function(err){
        if(err){
            console.log('couldnt write header, STOPPING...')
        } else {
            console.log('wrote header')
            async function seeddata(limit, batchsize){
                while(count > 0){
                    const batchnum = Math.floor( (limit-count)/batchsize);
                    const databatch = photoBatch(batchnum,batchsize,limit);
                    await makebatchpromise(databatch,batchnum)
                    count-=batchsize;
                }
            }
            seeddata(limit,batchsize);
        }
    });
}

module.exports = {seedPhotos};