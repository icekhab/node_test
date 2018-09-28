var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //if (!Array.prototype.forEach) {
        Array.prototype.forEach1 = function(callback, context)
        {
            for (let i = 0; i < this.length; i++) {
                callback.call(context || null, this[i], i, this);
            }
        };
    //}

    [1,2,3].forEach1(function (value, index, array) {

    })

    res.render('index', {title: 'Express', lol: 'LOLITA'});
});

module.exports = router;
