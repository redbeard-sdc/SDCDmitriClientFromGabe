const mongoose = require('mongoose');
const seedMongo = require('./seedMongo');

const mongoURI = process.env.DB_URI || 'mongodb://localhost/rickadvisor';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connection has been established.');
  })
  .catch(console.error);

(async () => {
  console.log('Seeding has begun...');
  try {
    await seedMongo();
    console.log('Database seeded successfully.');
    mongoose.connection.close();
  } catch (err) {
    console.error('Could not seed database.');
    mongoose.connection.close();
  }
})();
