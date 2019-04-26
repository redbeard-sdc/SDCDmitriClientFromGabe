const csv = require('csv-parser')
const fs = require('fs')
const path  = require('path');

fs.createReadStream(path.join(__dirname,"./files/Users.csv"))
  .pipe(csv())
  .on('data', (data) => console.log(data));