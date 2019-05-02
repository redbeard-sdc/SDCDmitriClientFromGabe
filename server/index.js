const { localenv } = 
require('newrelic');
const path = require('path');
const express = require('express');
const cors = require('cors');
const queue = require('express-queue');
const compression = require('compression');
const { knex } = require('./config');
const apiRoutes = require('./psqlroutes');

const app = express();
const port = process.env.PORT || 3100;


app.use(cors());
app.use(compression());
app.use(queue({ activeLimit: process.env.ACTIVE_LIMIT || 500, queuedLimit: process.env.QUEUE_LIMIT || 5000 }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', apiRoutes);

app.listen(port, () => console.log(`Express server running on port ${port}`));
