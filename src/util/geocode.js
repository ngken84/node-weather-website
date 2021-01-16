const request = require('postman-request');

const geocode = (address, callback) => {
	const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + 
		".json?limit=1&access_token=pk.eyJ1Ijoia2VuLW5vZGUtanMiLCJhIjoiY2tqaTd6dHk4NHJjazJ6cGtwaDc0aWUydCJ9.Eqc1dgj9KUm9xyjpE9Df4Q";
	request({ url, json : true }, (error, { body } = {}) => {
		if(error) {
			callback("Unable to connect to location services!", undefined)
		} else if (body.message) {
			callback(body.message, undefined);
		} else {
			if(body.features.length == 0) {
				callback("No location found!", undefined);
			} else {
				const longLatArray = body["features"][0]["center"];
				callback(undefined, {
					latitude : longLatArray[1],
					longitude : longLatArray[0],
					location : body.features[0].place_name
				})
			}
		}
	});
};

module.exports = geocode