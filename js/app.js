var showVenue = function(search) {
	
	// clone the result template code
	var result = $('.template .place').clone();
	
	// Set the venue name in result
	var venueName = result.find('.venue-name');
	/*venueName.text*/console.log(search.venue.name);

	// set the venue address in result
	var venueAddress = result.find('.venue-address');
	/*venueAddress.text*/console.log(search.location.formattedAddress);

	// show venue website
	var venueSite= result.find('.venue-site');
	/*venueSite.html*/console.log('<a target="_blank" href="'+ search.venue.url + '">' + search.venue.url + '</a>'

	// show venue tip
	var venueTip = result.find('.venue-tip');
	/*venueTip.text*/console.log(******question.view_count);
	);

	return result;
};

var getVenues = function(zip, type) {
	
	// the parameters we need to pass in our request to FourSquare's API
	var request = 	{			near: zip,
								client_id: 'AF2DLYUXC4545CEDCOO4OJGZPJCIQON5HZWRABVHAF4T4TSK',
								client_secret: '1YAHLVR1I4OWLG3QTOSPZ3JFPSNWJZDETBRNEJY30PGMHSOB',
								section: type,
								openNow: '1',
								v: '20151121',
					};
	
	var result = $.ajax({
				url: "https://api.foursquare.com/v2/venues/explore",
				data: request,
				dataType: "jsonp",
				type: "GET",
				})
		.done(function(result){ //this waits for the ajax to return with a succesful promise object
			var searchResults = showSearchResults(*******request.tagged, result.items.length);

			$('.search-results').html(searchResults);
			//$.each is a higher order function. It takes an array and a function as an argument.
			//The function is executed once for each item in the array.
			$.each(****result.items, function(i, item) {
				var venue = showVenue(item);
				$('.results').append(venue);
			});
		})
};

var showError = function(error){
	var errorElem = $('.template .error').clone();
	var errorText = '<p> Uh-oh! Something went wrong with your request! </p>';
	errorElem.append(errorText);
};

//App kicks in here
$(function() {
	$('#user-search').submit(function(){
		// zero out results if previous search has run
		$('.results').html('');
		// get the value of the tags the user submitted
		var zip = $(this).find("input[name='area']").val();
		var type = $(this).find("input[name='locationTypes']").val();
		var age = $(this).find("input[name='userAge']").val();
		getVenues(zip, type);
	});
});