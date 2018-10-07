const { validationResult } = require('express-validator/check');
const HttpStatus = require('http-status-codes');

const validateMiddleware = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        next();
        return;
    }

    res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
};

module.exports.validateMiddleware = validateMiddleware;