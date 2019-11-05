/* eslint-disable babel/new-cap */
const express = require('express');

const router = express.Router();

router.route('/media')
  .get((req, res) => res.send('Fetching media'));

router.route('/assets')
  .get((req, res) => res.send('Fetching assets'))
  .patch((req, res) => res.send('Modifying assets'));

module.exports = router;
