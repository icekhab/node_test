const express = require('express');
const router = express.Router();
const authHandlers = require('../controllers/authController');

/* POST Sign in user. */
router.post('/signIn', authHandlers.signIn);

/* POST users listing. */
router.post('/register', authHandlers.register);

module.exports = router;
