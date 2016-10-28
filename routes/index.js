var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});


router.get('/index', function(req, res, next) {
    res.render('/user/index.html')
})

router.get('/test', function(req, res, next) {
    res.sendFile(__dirname + '/test.html')
})

module.exports = router;
