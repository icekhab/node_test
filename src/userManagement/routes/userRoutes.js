const {Router} = require('express');
const router = Router();

const {UserService} = require('../services/userServices');

const {asyncHandler} = require('../../utils/express/asyncHandler');

/* GET user list. */
router.get('/', asyncHandler(UserService.getUserList));

/* GET user by login. */
router.get('/:login', asyncHandler(UserService.getUserByLogin));

module.exports = router;
