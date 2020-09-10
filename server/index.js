require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use(express.json());

app.get('/api/googlesearch', (req, res, next) => {
  fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat},${req.query.lng}&radius=50000&keyword=acai&key=${process.env.REACT_APP_GOOGLE_KEY}`)
    .then(data => data.json())
    .then(results => res.json(results))
    .catch(err => console.error(err));
});

app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3001');
});
