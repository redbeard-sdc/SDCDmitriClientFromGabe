// Hotels
//   "name"
//   "address"
//      -street
//      -city
//      -state
//      -zipcode
//      -country
//   "description"
//   "phone"
//   "nearest airport"
//   "url"
//   "ranking"
//   "stars"

const fs = require('fs');
const stringify = require('csv-stringify')
const faker = require('faker');
const generateAddress = () => {
    const address = {};
    address.street = faker.address.streetAddress();
    address.city = faker.address.city();
    address.state = faker.address.state();
    address.zipcode = faker.address.zipCode();
    address.country = 'United States';
    return address;
};

const hotelBatch = (batchnum, batchsize) => {
    const data = [];
    for(let i = 0; i < batchsize; i++) {
        const _id = batchnum * batchsize + i;
        const name = faker.name.findName();
        const street = faker.address.streetAddress();
        const city = faker.address.city();
        const state = faker.address.state();
        const zipcode = faker.address.zipCode();
        const country = 'United States';
        const phone = faker.phone.phoneNumber();
        const url = faker.internet.url();
        const description = faker.lorem.words(2);
        const nearestAirport = faker.lorem.word() + ' Airport';
        const ranking = faker.random.number(5); 
        const stars = faker.random.number(5);

        const entry = [_id, name, street, city, state ,zipcode, country, description, phone, nearestAirport, url, ranking, stars];
        data.push(entry);
    }
    return data;
}

var makebatchpromise = (databatch,batchnum) => {
    return new Promise((resolve,reject) => {
        stringify(databatch,(err,output) => {
            if(err) {
                console.log(`batch ${batchnum} of hotels failed to stringify`);
                resolve();
            } else {
                fs.appendFile('./files/Hotels.csv',output,function(err){
                    if(err){
                        console.log(`batch ${batchnum} of hotels failed to write`);
                        resolve();
                    } else {
                        console.log(`wrote batch ${batchnum} of hotels`);
                        resolve();
                    }
                });
            }
        });
    });
}


function seedHotels(limit, batchsize) {
    var count = limit;
    const dataheader = ['id', 'name', 'street', 'city', 'state', 'zip', 'country', 'description', 'phone', 'nearestAirport', 'url', 'ranking', 'stars\n'];
    fs.writeFile('./files/Hotels.csv', dataheader, function(err){
        if(err){
            console.log('couldnt write header, STOPPING...')
        } else {
            console.log('wrote header');
            async function seeddata(limit,batchsize){
                while(count > 0){
                    const batchnum = Math.floor( (limit-count)/batchsize);
                    let databatch = hotelBatch(batchnum,batchsize);
                    await makebatchpromise(databatch,batchnum);
                        count-=batchsize;
                }
            }
            seeddata(limit, batchsize);
        }
    });
}

module.exports = {seedHotels}; 
