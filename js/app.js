//function to clear input box after search
function resetForm() {
	$('#user-location').val('');
}

//function to get search data
var getVenues = function(zip) {
	
	// the parameters we need to pass in our request to FourSquare's API
	var request = 	{			near: zip,
								client_id: 'AF2DLYUXC4545CEDCOO4OJGZPJCIQON5HZWRABVHAF4T4TSK',
								client_secret: '1YAHLVR1I4OWLG3QTOSPZ3JFPSNWJZDETBRNEJY30PGMHSOB',
								section: 'topPicks',
								openNow: '1',
								sortByDistance: '1',
								v: '20151121',
					};
	
	var result = $.ajax({
				url: "https://api.foursquare.com/v2/venues/explore",
				data: request,
				dataType: "jsonp",
				type: "GET",
				})
		.done(function(result){ //this waits for the ajax to return with a succesful promise object
			for (var i = 0; i <= 5; i++) {	
				//console.log(result.response);		
				$('.results-container').append(
					'<b>Venue Name:</b><br><a target="_blank" href="' + result.response.groups[0].items[i].venue.url + '">' + result.response.groups[0].items[i].venue.name + '</a>' +
					'<b><br>Venue Type:</b><br>' + result.response.groups[0].items[i].venue.categories[0].name +
					'<b><br>Address:</b><br>' + result.response.groups[0].items[i].venue.location.formattedAddress[0] + '<br>' + result.response.groups[0].items[i].venue.location.formattedAddress[1] +
					'<b><br>Phone:</b><br>' + 	result.response.groups[0].items[i].venue.contact.formattedPhone +
					'<b><br>Hours:</b><br>' +	result.response.groups[0].items[i].venue.hours.status +
					'<b><br>You should know:</b><br>' + result.response.groups[0].items[i].tips[0].text + '<br><br>'
					);
			};
		})

};
//App kicks in here
$(document).ready(function () {
		$("#submit-button").on('click', function(e) {
	        e.preventDefault();
	        var userLocation = $("#user-location").val();
	        getVenues(userLocation);
	        resetForm();
	    });
});