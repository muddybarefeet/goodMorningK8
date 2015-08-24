
var init = function(){
	timeDisplay = document.createTextNode("");
	document.getElementById("clock").appendChild(timeDisplay);
}

		var updateClock = function(){
		//get the date
		var currentTime = new Date ();

		//get the hours and mins
		var currentHours = currentTime.getHours();
		var currentMinutes = currentTime.getMinutes();

		// Pad the minutes with leading zeros, if needed
		currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;

		// set "AM" or "PM" 
		var timeOfDay = (currentHours < 12) ? "AM" : "PM";

		// Convert the hours component to 12-hour format
		currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;

		// Convert an hours "0" to "12"
		currentHours = (currentHours === 0) ? 12 : currentHours;

		//making it say good morning/afternoon/evening
		if(timeOfDay === "AM") {
			document.getElementById("mornArvo").firstChild.nodeValue = "Morning";
		} else if(timeOfDay === "PM" && currentHours< 6){
			document.getElementById("mornArvo").firstChild.nodeValue = "Afternoon";
		} else {
			document.getElementById("mornArvo").firstChild.nodeValue = "Evening";
		}
		// Compose the string for display
		var currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;

		// Update the time display 
		document.getElementById("clock").firstChild.nodeValue = currentTimeString;
	};

var nameSet = function() {
    var name = prompt('What is your name?');
    if (name) {
		document.getElementById('name').innerHTML = name + '!';
	}
};

/*localStorage function to take a name input and remember it*/

$(function() {

	var edit = document.getElementById('edit');

	$(edit).blur(function() {
		localStorage.setItem('name', edit.textContent);
		console.log(localStorage);
	});

	if(localStorage.getItem('name')) {
		edit.textContent = localStorage.getItem('name');
	console.log(name);
	}
	
});




	