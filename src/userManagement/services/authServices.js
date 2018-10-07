const _ = require('lodash');
const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../models/userModel');
const { Role } = require('../models/roleModel');
const { ROLE } = require('../../utils/consts');

const { TOKEN_EXPIRY } = process.env;

class AuthService {
    static async signUp(req, res) {
        const user = new User(_.pick(req.body, ['login', 'firstName', 'lastName', 'password']));
        const queryRole = { name: ROLE.USERS };
        const role = await Role.findOne(queryRole, 'id name');
        user.roleId = role.id;
        await user.save();

        const payload = {
            userId: user.id,
            role: role.name,
        };

        const token = jwt.sign(payload, user.jwtSecret, { expiresIn: TOKEN_EXPIRY });
        const response = { token };

        res.status(HttpStatus.CREATED).json(response);
    }

    static async signIn(req, res) {
        const { login, password } = req.body;
        const query = { login };
        const user = await User.findOne(query, 'password jwtSecret roleId');

        if (!user) {
            res.status(HttpStatus.BAD_REQUEST).json({
                errors: [{
                    code: 'INVALID_NAME',
                    message: 'Invalid name',
                }],
            });
            return;
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            res.status(HttpStatus.BAD_REQUEST).json({
                errors: [{
                    code: 'INVALID_PASSWORD',
                    message: 'Invalid password',
                }],
            });
            return;
        }

        const role = await Role.findOne({ _id: user.roleId });

        const payload = {
            userId: user.id,
            role: role.name,
        };

        const token = jwt.sign(payload, user.jwtSecret, { expiresIn: TOKEN_EXPIRY });
        const response = { token };

        res.status(HttpStatus.OK).json(response);
    }

    static async logOut(req, res) {
        const payload = { jwtSecret: crypto.randomBytes(256).toString('hex') };
        const user = await User.findByIdAndUpdate(req.user.id, payload);

        if (!user) {
            res.sendStatus(HttpStatus.NOT_FOUND);
        }

        res.sendStatus(HttpStatus.OK);
    }

    static async verify(req, res, next) {
        const { token } = req;

        if (!token) {
            res.sendStatus(HttpStatus.UNAUTHORIZED);
            return;
        }

        const payload = jwt.decode(token);

        if (!payload) {
            res.sendStatus(HttpStatus.UNAUTHORIZED);
            return;
        }

        const user = await User.findById(payload.userId, 'jwtSecret roleId');

        if (!user) {
            res.sendStatus(HttpStatus.UNAUTHORIZED);
            return;
        }

        jwt.verify(token, user.jwtSecret);

        req.user = {
            id: payload.userId,
            role: payload.role,
        };

        next();
    }
}

module.exports.AuthService = AuthService;
