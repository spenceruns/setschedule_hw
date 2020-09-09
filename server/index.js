require('dotenv/config');
const express = require('express');

const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);
app.use(express.json());

app.get('/api/search', (req, res, next) => {
  fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=magic+the+gathering+in+${req.query.zipcode}&radius=50000&key=${process.env.GOOGLE_MAPS_API_KEY}`)
    .then(data => data.json())
    .then(results => res.json(results))
    .catch(err => next(err));
});

app.get('/api/zipcode', (req, res, next) => {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.zipcode}&key=${process.env.GOOGLE_MAPS_API_KEY}`)
    .then(data => data.json())
    .then(results => res.json(results))
    .catch(err => next(err));
});

app.get('/api/address', (req, res, next) => {
  fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.query.storeName}&key=${process.env.GOOGLE_MAPS_API_KEY}`)
    .then(data => data.json())
    .then(results => res.json(results))
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
