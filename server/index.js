require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use(express.json());

app.get('/api/googlesearch', (req, res, next) => {
  fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${req.query.query}&location=${req.query.lat},${req.query.lng}&radius=${req.query.radius}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
    .then(data => data.json())
    .then(results => res.json(results))
    .catch(err => console.error(err));
});

app.get('/api/yelpsearch', (req, res, next) => {
  fetch(`https://api.yelp.com/v3/businesses/search?term=${req.query.query}&latitude=${req.query.lat}&longitude=${req.query.lng}&radius=${req.query.radius}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_YELP_KEY}`
    }
 })
    .then(data => data.json())
    .then(results => res.json(results))
    .catch(err => console.error(err));
});

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
