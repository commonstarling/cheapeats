//function to clear input box after search
function resetForm() {
	$('#user-location').val('');
}

//function to hide results display before the search
function hideDisplay() {
	$('.results-container').hide();
}

//function to display search results
function showResults(result) {
	$('.results-container').show();
	$('.results-container').html('');
	for (var i = 0; i <= 10; i++) {	
				$('.results-container').append(
					'<br><b><a target="_blank" href="' + result.response.groups[0].items[i].venue.url + '">' + result.response.groups[0].items[i].venue.name + '</a></b></br>' +
					'<br><b><span>Venue Type:</span></b>	' + result.response.groups[0].items[i].venue.categories[0].name +
					'<br><b><span>Address:</span></b>	' + result.response.groups[0].items[i].venue.location.formattedAddress[0] + ', ' + result.response.groups[0].items[i].venue.location.formattedAddress[1] +
					'<br><b><span>Phone:</span></b>	' + result.response.groups[0].items[i].venue.contact.formattedPhone +
					'<br><b><span>Hours:</span></b>	' +	result.response.groups[0].items[i].venue.hours.status +
					'<br><b><span>You should know:</span></b>	' + result.response.groups[0].items[i].tips[0].text + '<br><br>'
					);
			};
}

//function to get search data
var getVenues = function(zip) {
	
	// the parameters we need to pass in our request to FourSquare's API
	var request = 	{			near: zip,
								client_id: 'AF2DLYUXC4545CEDCOO4OJGZPJCIQON5HZWRABVHAF4T4TSK',
								client_secret: '1YAHLVR1I4OWLG3QTOSPZ3JFPSNWJZDETBRNEJY30PGMHSOB',
								section: 'food',
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
			showResults(result);
		})
		.fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
			var errorElem = showError(error);
			$('.results-container').append("Uh-oh! Something went wrong with your request!");
		});

};

//App kicks in here
$(document).ready(function () {
	hideDisplay();
	$("#submit-button").on('click', function(e) {
	    e.preventDefault();
	    var zip = $("#user-location").val();
	    getVenues(zip);
	    resetForm();
	});
});