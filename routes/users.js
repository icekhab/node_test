var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resources');
});

/* GET users listing. */
router.get('/:id([0-9]{5})', function(req, res, next) {
    res.send(`respond with a resources ${req.params.id}`);
});

module.exports = router;
