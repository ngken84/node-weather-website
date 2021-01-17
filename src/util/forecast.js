const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
	const url = "http://api.weatherstack.com/current?access_key=530684665625707dac01a1e7895f6ac8&units=f&query=" + latitude + "," + longitude;
	request({ url, json: true}, (error, {body} = {}) => {
		if(error) {
			callback("Unable to connect to forcasting service.", undefined);
		} else {
			if(body.error) {
				console.log(body.error);
				callback("The following forecast error occured: " + body.error.info);
			} else {
				console.log(body);
				const {temperature, feelslike, weather_icons } = body.current;
				const description = body.current.weather_descriptions[0];
				callback(undefined, {
					message : description + " : It is currently " + temperature + " degress out. It feels like " + feelslike + " degress out.",
					description : description,
					temperature,
					feelslike,
					weather_icons
				});
			}
		}
	});
}

module.exports = forecast