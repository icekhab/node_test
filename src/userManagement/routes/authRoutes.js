const { Router } = require('express');
const { body } = require('express-validator/check');
const { passwordValidator } = require('../../utils/validators/passwordValidator');
const { validateMiddleware } = require('../../utils/express/validateMiddleware');
const { AuthService } = require('../services/authServices');
const { asyncHandler } = require('../../utils/express/asyncHandler');

/* VALIDATORS */

const signInValidators = [

    body('password')
        .custom(passwordValidator)
        .withMessage('Password must have more than five characters, at least one number and letter'),
    body('login')
        .exists()
        .withMessage('Login is required.'),
];

const signUpValidators = [
    body('password')
        .custom(passwordValidator)
        .withMessage('Password must have more than five characters, at least one number and letter'),
    body('login')
        .exists()
        .withMessage('Login is required.'),
    body('firstName')
        .exists()
        .withMessage('First name is required.'),
    body('lastName')
        .exists()
        .withMessage('Last name is required.'),
];

/* HTTP REQUESTS */

const router = Router();

router.post('/signIn', signInValidators, validateMiddleware, asyncHandler(AuthService.signIn));
router.post('/signUp', signUpValidators, validateMiddleware, asyncHandler(AuthService.signUp));
router.post('/logOut', asyncHandler(AuthService.logOut));

module.exports = router;
