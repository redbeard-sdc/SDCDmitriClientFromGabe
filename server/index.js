require('newrelic');
const path = require('path');
const express = require('express');
const cors = require('cors');
const { knex } = require('./config');
const apiRoutes = require('./psqlroutes');

const app = express();
const port = process.env.PORT || 3100;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', apiRoutes);

app.listen(port, () => console.log(`Express server running on port ${port}`));
