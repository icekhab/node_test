const HttpStatus = require("http-status-codes");

const { User } = require('../models/userModel');
const _ = require('lodash');

class UserService {
    static async getUserList(req, res) {
        const users = await User.find({}, 'login firstName lastName');

        res.status(HttpStatus.OK).json(users);
    }

    static async getUserByLogin(req, res) {
        const user = await User.findOne({}, 'login firstName lastName');

        res.status(HttpStatus.OK).json(user);
    }
}

module.exports.UserService = UserService;