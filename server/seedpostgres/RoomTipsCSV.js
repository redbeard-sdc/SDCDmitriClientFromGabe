
//     roomTips
//          - _id
//          - hotel_id
//          - date
//          - tip
//          - rating

const fs = require('fs');
const stringify = require('csv-stringify')
const faker = require('faker');
const {pickEnym,generateRandomNumber, imagesenym} = require("./iterfunctions");


const RoomTip = () => {
    let roomtip = {}
    roomtip.date = faker.date.past();
    roomtip.tip = faker.lorem.words(2);
    roomtip.rating = Math.round(Math.random() * 5);
    return roomtip;
};

const generateRoomTips = () => {
    roomtips = [];
    var tips = generateRandomNumber(3);
    for (let i=0; i< tips; i++){
        roomtips.push(RoomTip());
    }
    return roomtips;
}


const roomtipBatch = (batchnum,batchsize,limit) => {
    const data = [];
    for(let i = 0; i < batchsize; i++) {
        const hotel_id = generateRandomNumber(limit);
        const _id =  batchnum * batchsize + i;
        const tip = faker.lorem.words(2);
        const rating = Math.round(Math.random() * 5);
        const date = faker.date.between('2019-02-01', '2019-05-31');
        const entry = [_id, hotel_id, date, tip, rating];
        data.push(entry);
    }
    return data;
}

var makebatchpromise = (databatch,batchnum) => {
    return new Promise((resolve,reject) => {
        stringify(databatch,(err,output) => {
            if(err) {
                console.log(`batch ${batchnum} of roomtips failed to stringify`);
                resolve();
            } else {
                fs.appendFile('./files/RoomTips.csv',output,function(err){
                    if(err){
                        console.log(`batch ${batchnum} of roomtips failed to write`);
                        resolve();
                    } else {
                        console.log(`wrote batch ${batchnum} of roomtips`);
                        resolve();
                    }
                });
            }
        });
    });
}

function seedRoomTips(limit, batchsize){
    var count = limit;
    const dataheader = ['_id', 'hotel_id', 'date', 'tip', 'rating\n']
    fs.writeFile('./files/RoomTips.csv', dataheader, function(err){
        if(err){
            console.log('couldnt write header, STOPPING...')
        } else {
            console.log('wrote header')
            async function seeddata(limit, batchsize){
                while(count > 0){
                    const batchnum = Math.floor( (limit-count)/batchsize);
                    const databatch = roomtipBatch(batchnum,batchsize,limit);
                    await makebatchpromise(databatch,batchnum)
                    count-=batchsize;
                }
            }
            seeddata(limit,batchsize);
        }
    });
}

module.exports = { seedRoomTips };
