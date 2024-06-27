var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const data = {
    title: 'kinauanne', 
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  }
  res.render('index', data);
});

module.exports = router;
