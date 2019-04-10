var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

var ctrlList = require('../controllers/list.controller');

// profile
router.get('/list', auth, ctrlList.get);

// authentication
router.post('/list', auth, ctrlList.create);
router.put('/list', auth, ctrlList.update);

module.exports = router;
