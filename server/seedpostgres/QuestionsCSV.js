
//     questions
//         - _id
//         - hotel_id
//         - date
//         - question

const fs = require('fs');
const stringify = require('csv-stringify')
const faker = require('faker');
const {pickEnym,generateRandomNumber, imagesenym} = require("./iterfunctions");



const questionBatch = (batchnum,batchsize,limit) => {
    const data = [];
    for(let i = 0; i < batchsize; i++) {
        const hotel_id = generateRandomNumber(limit);
        const _id =  batchnum * batchsize + i;
        const date = faker.date.between('2019-02-01', '2019-05-31');
        question = faker.lorem.words(2);
        const entry = [_id, hotel_id, date, question];
        data.push(entry);
    }
    return data;
}

var makebatchpromise = (databatch,batchnum) => {
    return new Promise((resolve,reject) => {
        stringify(databatch,(err,output) => {
            if(err) {
                console.log(`batch ${batchnum} of questions failed to stringify`);
                resolve();
            } else {
                fs.appendFile('./files/Questions.csv',output,function(err){
                    if(err){
                        console.log(`batch ${batchnum} of questions failed to write`);
                        resolve();
                    } else {
                        console.log(`wrote batch ${batchnum} of questions`);
                        resolve();
                    }
                });
            }
        });
    });
}

function seedQuestions(limit, batchsize){
    var count = limit;
    const dataheader = ['_id','hotel_id', 'date','question\n']
    fs.writeFile('./files/Questions.csv', dataheader, function(err){
        if(err){
            console.log('couldnt write header, STOPPING...')
        } else {
            console.log('wrote header')
            async function seeddata(limit, batchsize){
                while(count > 0){
                    const batchnum = Math.floor( (limit-count)/batchsize);
                    const databatch = questionBatch(batchnum,batchsize,limit);
                    await makebatchpromise(databatch,batchnum)
                    count-=batchsize;
                }
            }
            seeddata(limit,batchsize);
        }
    });
}

module.exports = {seedQuestions};