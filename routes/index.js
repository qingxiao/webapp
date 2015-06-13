var express = require('express');
var router = express.Router();
var promise = require('promise');
var spotifyApi = require('../module/spotifyApi');


/* GET home page. */
router.get('/', function (req, res, next) {
    spotifyApi.getCategories({
        limit: 20,
        offset: 0,
        country: 'SE',
        locale: 'sv_SE'
    })
        .then(function (data) {
            //res.send(data.body);
            res.render('index', data.body);
            // next();
        }, function (err) {
            console.log("Something went wrong!", err);
        });

});
router.get('/category/:cid', function (req, res, next) {
    var cid = req.params.cid;
    promise.all([
        spotifyApi.getCategory(cid),
        spotifyApi.getPlaylistsForCategory(cid, {limit:5})
    ])
        .then(function(datas){
            //console.log(JSON.stringify(datas[0].body), JSON.stringify(datas[1].body));
            res.render('page/category/list', {
                category:datas[0].body,
                playList:datas[1].body
            });
        },function(err){
            console.log("Something went wrong1!", err);
        });

});

router.get('/album/:albumId', function (req, res, next) {
    var albumId = req.params.albumId;
    //第一个参数 uiserid 没有就默认 spotivy
    spotifyApi.getPlaylistTracks('spotify', albumId, {limit:10})
        .then(function(data) {
            console.log(JSON.stringify(data.body))
            res.render('page/playlist', {aData:data.body});
        }, function(res){console.log(res)});

});
router.get('/track/:id', function (req, res, next) {
    var id = req.params.id;
    spotifyApi.getTrack (id)
        .then(function(data) {
            console.log(JSON.stringify(data.body))
           // res.render('page/playlist', {aData:data.body});
        }, function(res){console.log(res)});

});

router.get('/callback', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
module.exports = router;
