var Fetch = require('whatwg-fetch');
var baseURL = 'http://api.openweathermap.org/data/2.5/';

var service = {
    get: function(url) {
        return fetch(baseURL + url)
        .then(function(response) {
            return response.json();
        });
    }

};

module.exports = service;
