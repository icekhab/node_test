const mongoose = require('mongoose');
const User = mongoose.model('User');
const _ = require('lodash');

exports.getUserList = function (req, res) {
    User.find({}
        , function (err, users) {
            if (err) throw err;

            res.json(_.map(users, user => _.pick(user, ['login', 'firstName', 'lastName'])));
        })
};

exports.getUserByLogin = function (req, res) {
    User.findOne({login: req.params.login}
        , function (err, user) {
            if (err) throw err;

            res.json(_.pick(user, ['login', 'firstName', 'lastName']));
        })
};