const HttpStatus = require('http-status-codes');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    if (err.name === 'MongoError' && err.code === 11000) {
        res.status(HttpStatus.BAD_REQUEST).json({
            errors: [{
                code: 'DUPLICATE_ERROR',
                message: err.message,
            }],
        });
        return;
    }

    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
};

module.exports.errorHandler = errorHandler;
