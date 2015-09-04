$(document).ready(function() {


	var init = function(){
		timeDisplay = document.createTextNode("");
		document.getElementById("clock").appendChild(timeDisplay);
	};


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



	/*localStorage function to take a name input and remember it*/

	$(function() {

		var edit = document.getElementById('edit');

		$(edit).blur(function() {
			localStorage.setItem('name', edit.textContent);
		});

		if(localStorage.getItem('name')) {
			edit.textContent = localStorage.getItem('name');
			
		}
		
	});

	//window resize function for chat bar messages not to push the topper off the top of the page!


	$('#anchorsAway').on('click',function() {
		setInterval(function (){

		  var wHeight = window.innerHeight; //get full page height
		  var topH = $('#barFormat').height(); //get height of top div
		  var bottomH = $('.chatBox').height(); //get height of the bottom div
		  var newHeight = wHeight - topH - bottomH;
		  $('.messages').height(newHeight); //set the new height acordingly to the messages class
		}, 0);
	});


	//make the image change each day

	var picUpdate = function() {
		var startTime = new Date(2015, 07, 30); //set a start date variable for the first september(tomorrow)
		var timeNow = new Date(); //time now
		//find the difference between them:
		var ms = moment(startTime,"DD/MM/YYYY HH:mm:ss").diff(moment(timeNow,"DD/MM/YYYY HH:mm:ss"));
		var timeDiff = moment.duration(ms);//calculation
		var daysPassed = Math.floor(timeDiff.asDays());//gives the hours passed since startTime
		//I want a new picture every day at midnight 
		//clever way to never get to the end of the images list!
		var imageNum = daysPassed%13;
		//set the background image as the imageNum variable
		document.body.style.background = 'url(./pics/'+imageNum+'.jpg) no-repeat';
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundAttachment = 'fixed';
		document.body.style.width = '100%';
		document.body.style.margin = 0;
		document.body.style.padding = 0;
	};


/*get weather data and apend the correct symbol*/




	$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=37.7749295&lon=-122.4194155", function(data){
		console.log(data.weather[0].id);
		var weatherTypeId;
		var averageTemp = Math.round((data.main.temp)-273.15); //average temp converted from kelvin to celcius
		if(data.weather[0].id !== 800 || data.weather[0].id !== 804) {
			weatherTypeId = Math.ceil(data.weather[0].id/100)*100; //weather description id
		} else {
			weatherTypeId = data.weather[0].id;
		}
console.log(data.weather[0].id);
	//using the limited font awesome icons so limited symbols BUT can alter the sizes so sticking with font awesome!
		function weatherIcon(id,avTemp) {

			if(id===200) {
				$('.wIconTemp').append('<i class="fa fa-bolt fa-3x"></i>'+'<span class="temp">'+avTemp+'&deg;C'+'</span>');
			} else if(id===300) {
				$('.wIconTemp').append('<i class="fa fa-tint fa-3x"></i>'+'<span class="temp">'+avTemp+'&deg;C'+'</span>');
			} else if(id===500) {
				$('.wIconTemp').append('<i class="fa fa-tint fa-3x"></i>'+'<span class="temp">'+avTemp+'&deg;C'+'</span>'); //not great rain pic
		  } else if(id===600) {
		  	$('.wIconTemp').append('<i class="fa fa-exclamation-triangle fa-2x"></i>'+'<span class="temp">'+avTemp+'&deg;C'+'</span>');
		  } else if(id===700) {
		  	$('.wIconTemp').append('<i class="fa fa-cloud fa-3x"></i>'+'<span class="temp">'+avTemp+'&deg;C'+'</span>');
		  } else if(id===800) {
				$('.wIconTemp').append('<i class="fa fa-sun-o fa-3x"></i>'+'<span class="temp">'+avTemp+'&deg;C'+'</span>');
			} /*else if(id===801 || id===802 || id ===803) { 
				$('.wIconTemp').append('<i class="wi-day-cloudy"></i>'+'<span class="temp">'+avTemp+'&deg;C'+'</span>');
			}*/ else if(id===804) {
        $('.wIconTemp').append('<i class="fa fa-cloud fa-3x"></i>'+'<span class="temp">'+avTemp+'&deg;C'+'</span>');
      } else if(id===900) {
				$('.wIconTemp').append('<i class="fa fa-exclamation-triangle fa-2x"></i>'+'<span class="temp">'+avTemp+'&deg;C'+'</span>');
			}

		}

		weatherIcon(weatherTypeId,averageTemp);

	});

	
	//show and hide chat bar

  $("#anchorsAway").on('click', function(e) {
        $('.messBar').toggleClass("hidden");
      });


//when the button clicked I want messages to appear :)
  var myDataRef = new Firebase('https://pm9haxvsd30.firebaseio-demo.com/');
  var count = 0; //I DONT LIKE THIS HERE :(

  //set local storage counter to the number of messages in chat when messages closed! WHERE PUT???

  $('#anchorsAway').on('click',function() {
    if(!$('.messBar').hasClass('hidden')) {
    }
  });

  //when something typed and enter hit in messagesInput then get the data and put into the firebase database  
  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = localStorage.getItem('name');
      var text = $('#messageInput').val();
      myDataRef.push({name: name, text: text});
      $('#messageInput').val('');
      localStorage.setItem('counter', count);
    }
  });

  //when a child is added add new chat message to the messages list.

  myDataRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
    count++;

//if messages bar not open then check the difference between the current and last stored 
    //mesages and change color of icon to alert user
    if($('.messBar').hasClass('hidden')) {

      var oldMessages = localStorage.getItem('counter'); //take local storgae
      var allMessages = count;
      var newMessages = allMessages - oldMessages;
      //when the messages tab is shut show red else be normal
      if(newMessages>0) {
        //if difference then alert new messages somehow
        $('.fa-anchor').addClass('red');
          $('#anchorsAway').on('click',function() {
            //make the new messages red....
            $('#messagesDiv>li').slice(-(newMessages)).addClass('red');
          });

      }
          
    }
    //when the anchor is clicked to show the new messages remove color
    $('#anchorsAway').on('click',function() {
      if($('.fa-anchor').hasClass('red')) {
        $('.fa-anchor').removeClass('red');
      }
    });

     $('#messageInput').on('keypress',function(e) {
      if (e.keyCode == 13) {
        if($('#messagesDiv>li').hasClass('red')) {
          $('#messagesDiv>li').removeClass('red');
        }
      }
    });


});


  function displayChatMessage(name, text) {
    $('<li/>').text(text).prepend($('<span/>').text(name+': ')).appendTo($('#messagesDiv'));
   // $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    $('.messages').scrollTop($('.messages').prop('scrollHeight'));
  }

  


  updateClock();
  setInterval(updateClock, 1000);
  picUpdate();

});







	