var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('change', { title: '修改密码' });
});

module.exports = router;

