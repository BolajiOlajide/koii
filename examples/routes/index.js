/* eslint-disable babel/new-cap */
const express = require('express');

const router = express.Router();

router.route('/users/:id')
  .put((req, res) => {
    if (req) {
      res.status(200).json({
        data: [{
          firstName: 'proton',
          lastName: 'nucleons',
        }]
      });      
    }
  })
  .head((req, res) => {
    if (req) {
      res.status(201).json({
        data: [{
          firstName: 'electron',
          lastName: 'nucleons',
        }]
      });      
    }
  });

module.exports = router;
