var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var uuid = require('node-uuid');

router.get('/', function (req, res, next) {

    AWS.config.update({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    });
    var s3 = new AWS.S3({ signatureVersion: 'v4' });
    var bucket = 'happyhut';
    var uniqueId = uuid.v4();
    var key = uniqueId + '.jpg';
    var params = { Bucket: bucket, Key: key };
    s3.getSignedUrl('putObject', params, function (err, url) {
        console.log("The URL is", url);
        res.json({
            url: url,
            bucket: bucket,
            key: key,
            uniqueId: uniqueId
        });
    });
});


router.get('/:id', function (req, res, next) {

    AWS.config.update({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    });

    var key = req.params.id;
    var s3 = new AWS.S3({ signatureVersion: 'v4' });
    var bucket = 'happyhut';
    var params = { Bucket: bucket, Key: key };
    s3.getSignedUrl('getObject', params, function (err, url) {
        if(err) {
            console.log("err is ", err);
        }
        if(url) {
            res.json({
                url: url
            });
        } else {
            res.json(null);
        }
    });
});


module.exports = router;
