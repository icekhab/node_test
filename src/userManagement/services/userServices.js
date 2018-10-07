const HttpStatus = require('http-status-codes');
const AccessControl = require('accesscontrol');
const { User } = require('../models/userModel');
const { MongooseHelper } = require('../../utils/mongoose');

const accessControl = new AccessControl();

accessControl
    .grant('User')
    .createOwn('user')
    .deleteOwn('user')
    .readOwn('user', ['*', '!createdAt', '!updatedAt']);

accessControl
    .grant('Admin')
    .createAny('user')
    .deleteAny('user')
    .readAny('user');

class UserService {
    static async getUserList(req, res) {
        const permission = accessControl.can(req.user.role).readAny('user');
        if (!permission.granted) {
            res.status(HttpStatus.FORBIDDEN).end();
            return;
        }

        const users = await MongooseHelper.selectWithPick(User, {}, 'id login firstName lastName createdAt updatedAt');

        res.status(HttpStatus.OK).json(permission.filter(users));
    }

    static async getUserByLogin(req, res) {
        const user = await MongooseHelper.selectOneWithPick(User, { _id: req.user.id }, 'id login firstName lastName createdAt updatedAt');

        const permission = user.id === req.user.id
            ? accessControl.can(req.user.role).readOwn('user')
            : accessControl.can(req.user.role).readAny('user');

        if (permission.granted) {
            res.status(HttpStatus.OK).json(permission.filter(user));
        }

        res.status(HttpStatus.FORBIDDEN).end();
    }
}

module.exports.UserService = UserService;
