const express = require('express');

const router = express.Router();

router.route('/api/settings')
  .get((req, res) => {
    res.status('200').send({
      setting1: 'hello world',
    });
  });

module.exports = router;
