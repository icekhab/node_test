const { Router } = require('express');
const { UserService } = require('../services/userServices');
const { asyncHandler } = require('../../utils/express/asyncHandler');

/* ROUTES */

const router = Router();

router.get('/', asyncHandler(UserService.getUserList));
router.get('/:login', asyncHandler(UserService.getUserByLogin));

module.exports = router;
