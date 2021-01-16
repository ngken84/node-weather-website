const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./util/forecast');
const geocode = require('./util/geocode');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(path.join(__dirname, '../public')));


app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Ken Ng'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		name: 'Ken Ng'
	})
});

app.get('/help', (req, res) => {
	res.render('help', {
		message: 'HELP ME'
	});
});


app.get('/weather', (req, res) => {

	if(!req.query.location) {
		return res.send({
			error : 'No location data received. Please enter a location query.'
		});
	}

	geocode(req.query.location, (error, {latitude, longitude, location} = {}) => {
		if(error) {
			return res.send({
				error : error
			});
		}
		forecast(latitude, longitude, (error, data) => {
			if(error) {
				return res.send({
					error : error
				});
			}
			data.actual_location = location;
			data.location = req.query.location;
			res.send(data);
		});
	});
});

app.get('/products', (req, res) => {
	console.log(req.query.key);
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		link: '/help',
		linkname: 'help page',
		message: 'Help page does not exist'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		link: '/',
		linkname: 'home page',
		message: 'Page not found!'
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});