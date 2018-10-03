var express = require('express');
var router = express.Router();

var userHandlers = require('../controllers/userController');
var authHandlers = require('../controllers/authController');

/* GET users listing. */
router.get('/', authHandlers.loginRequired, userHandlers.getUserList);

/* GET users listing. */
router.get('/:login', authHandlers.loginRequired, userHandlers.getUserByLogin);

module.exports = router;
