require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use(express.json());

app.get('/api/googlesearch', (req, res) => {
  fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${req.query.query}&location=${req.query.lat},${req.query.lng}&radius=${req.query.radius}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
    .then(data => data.json())
    .then(results => res.json(results))
    .catch(err => console.error(err));
});

app.get('/api/yelpsearch', (req, res) => {
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

app.get('/api/googlestore', (req, res) => {
  fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.query.id}&fields=name,geometry,formatted_phone_number,formatted_address,website&key=${process.env.REACT_APP_GOOGLE_KEY}`)
    .then(data => data.json())
    .then(results => res.json(results))
    .catch(err => console.error(err));
});

app.get('/api/yelpstore', (req, res) => {
  fetch(`https://api.yelp.com/v3/businesses/${req.query.id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_YELP_KEY}`
    }
  })
    .then(data => data.json())
    .then(results => res.json(results))
    .catch(err => console.error(err));
});

app.listen(3002, () => {
  console.log('Listening on port 3002');
});
