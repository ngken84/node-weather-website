const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const loadingDiv = document.querySelector('#loading-div');
const weatherCard = document.querySelector('#weather-card');
const weatherText = document.querySelector('#weather-text');
const weatherTitle = document.querySelector('#weather-title');
const image = document.querySelector('#weather-image');
const alertDiv = document.querySelector('#weather-alert');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = search.value;
	weatherCard.style.display = 'none';
	loadingDiv.style.display = 'block';
	alertDiv.style.display = 'none';

	fetch('/weather?location=' + encodeURIComponent(location.trim())).then((response) => {
		response.json().then((data) => {
			loadingDiv.style.display = 'none';
			if (data.error) {
				alertDiv.textContent = data.error;
				alertDiv.style.display = 'block';
			} else {
				weatherCard.style.display = 'block';
				weatherTitle.textContent = data.actual_location;
				weatherText.textContent = data.message
				if(data.weather_icons && data.weather_icons.length > 0) {
					image.src = data.weather_icons[0];
				}
			}
		
		});
	});

	console.log("testing");
});