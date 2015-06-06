/**
 * Created by xiaoqing on 2015/6/6.
 */
var SpotifyWebApi = require('spotify-web-api-node');


var spotifyApi = new SpotifyWebApi({
    clientId : 'd48581ef00c946e591b055910b46f97d',
    clientSecret : '30537049e2ce46caa80c35588465ca3d',
    redirectUri : 'http://lcoalhost:3000/callback'
});

//根据clientSecret 获取token
spotifyApi.clientCredentialsGrant()
    .then(function(data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        return spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
        console.log('Something went wrong when retrieving an access token', err);
    });
module.exports = spotifyApi;