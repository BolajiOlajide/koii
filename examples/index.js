'use strict';

const express = require('express');
const koi = require('../lib');

const app = express();
const PORT = 3103;

app.get('/', function(req, res) {
  return res.send({ status: 'success', message: 'Sample express application' });
});

app.get('/:name', function(req, res) {
  return res.send({ status: 'success', message: 'Welcome ' + req.params.name });
});

app.post('/:name', function(req, res) {
  return res.send({ status: 'success', message: 'Welcome ' + req.params.name });
});

app.use(koi);

app.listen(PORT, function(err) {
  if (err) {
    console.log('error ==>', err.message);
    return;
  }
  console.log('Application running on port ' + PORT);
})
