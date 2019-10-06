const { Router } = require('express');


const router = Router();

router.route('/media')
  .get((req, res) => res.send('Fetching media'));

router.route('/assets')
  .get((req, res) => res.send('Fetching assets'))
  .delete((req, res) => res.send('Deleting assets'));

module.exports = router;
