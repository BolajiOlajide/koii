const { Router } = require('express');


const router = Router();

router.route('/stuff')
  .get((req, res) => res.send('Fetching stuff'));

module.exports = router;
