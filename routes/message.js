var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Message = require('../models/message.js');

/* GET ALL BOOKS */

router.get('/:username', function (req, res, next) {
	console.log("------------", req.params.username);
	if (!req.params.username) {
		res.json({ success: false, message: 'No username was provided' }); // Return error message
	} else {
        Message.find({ 'username': req.params.username }, function (err, products) {
            if (err) return next(err);
            res.json(products);
        }).sort({ createdBy: -1 });
	}
});


/* GET SINGLE BOOK BY ID */
router.get('/:id', function (req, res, next) {
    Message.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE BOOK */
router.post('/', function (req, res, next) {
    Message.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE BOOK */
router.put('/:id', function (req, res, next) {
    Message.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE BOOK */
router.delete('/:id', function (req, res, next) {
    Message.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;