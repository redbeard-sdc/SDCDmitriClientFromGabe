// Answers
//     user_id
//     question_id
//     date
//     answer
//     votes

const fs = require('fs');
const stringify = require('csv-stringify');
const faker = require('faker');
const {generateRandomNumber} = require("./iterfunctions");

const answerBatch = (batchnum,batchsize,limit) => {
    const data = [];
    for(let i = 0; i < batchsize; i++) {
        const user_id = generateRandomNumber(limit);
        const _id = batchsize * batchnum + i;
        const date = faker.date.between('2019-02-01', '2019-05-31');
        const answer = faker.lorem.words(2);
        const votes = faker.random.number(10000);
        const entry = [_id, user_id, date, answer, votes];
        data.push(entry);
    }
    return data;
}

var makebatchpromise = (databatch,batchnum) => {
    return new Promise((resolve,reject) => {
        stringify(databatch,(err,output) => {
            if(err) {
                console.log(`batch ${batchnum} of answers failed to stringify`);
                resolve();
            } else {
                fs.appendFile('./files/Answers.csv',output,function(err){
                    if(err){
                        console.log(`batch ${batchnum} of answers failed to stringify`);
                        resolve();
                    } else {
                        console.log(`wrote batch ${batchnum} of answers`);
                        resolve();
                    }
                });
            }
        });
    });
}

function seedAnswers(limit, batchsize){
    var count = limit;
    const dataheader = ['_id','user_id','date','answer', 'votes\n']
    fs.writeFile('./files/Answers.csv', dataheader, function(err){
        if(err){
            console.log('couldnt write header, STOPPING...')
        } else {
            console.log('wrote header')
            async function seeddata(limit,batchsize){
                while(count > 0){
                    const batchnum = Math.floor( (limit-count)/batchsize);
                    const databatch = answerBatch(batchnum,batchsize,limit);
                    await makebatchpromise(databatch,batchnum)
                    count-=batchsize;
                }
            }
            seeddata(limit,batchsize);
        }
    });
}

module.exports = {seedAnswers};
