const mongoose = require('mongoose');
const _ = require("lodash");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');

exports.register = function (req, res) {
    const newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function (err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            return res.json(_.pick(user, ['login', 'firstName', 'lastName']));
        }
    });
};

exports.signIn = function (req, res) {
    User.findOne({
        login: req.body.login
    }, function (err, user) {
        if (err) throw err;
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({message: 'Authentication failed. Invalid user or password.'});
        }

        const userInfo = _.pick(user, ["login", "lastName", "firstName", "_id"]);

        return res.json({
            token: jwt.sign(userInfo, 'RESTFULAPIs'),
            userInfo: userInfo
        });
    });
};

exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({message: 'Unauthorized user!'});
    }
};