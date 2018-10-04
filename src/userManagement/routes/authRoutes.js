const {Router} = require('express');
const {AuthService} = require('../services/authServices');
const {asyncHandler} = require('../../utils/express/asyncHandler');

const router = Router();


/* POST Sign in user. */
router.post('/signIn', asyncHandler(AuthService.signIn));

/* POST Sign up user. */
router.post('/signUp', asyncHandler(AuthService.signUp));

/* POST Log out user. */
router.post('/logOut', asyncHandler(AuthService.logOut));

module.exports = router;
