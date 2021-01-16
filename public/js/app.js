const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = search.value;
	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';
	fetch('/weather?location=' + encodeURIComponent(location.trim())).then((response) => {
		response.json().then((data) => {
			messageOne.textContent = ''
			if (data.error) {
				messageTwo.textContent = data.error;
			} else {
				messageOne.textContent = data.actual_location;
				messageTwo.textContent = data.message
			}
		
		});
	});

	console.log("testing");
});