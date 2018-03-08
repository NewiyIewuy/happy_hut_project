var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var base64 = require('base-64');
var fs = require('fs');
var Photo = require('../models/photo.js');

router.post('/', function (req, res, next) {
	Photo.create(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});

});
router.get('/:username', function (req, res, next) {
	console.log("------------", req.params.username);
	if (!req.params.username) {
		res.json({ success: false, message: 'No username was provided' }); // Return error message
	} else {
		Photo.find({ 'username': req.params.username }, function (err, products) {
			if (err) return next(err);
			res.json(products);
		}).sort({ createdBy: -1 });
	}
});

module.exports = router;