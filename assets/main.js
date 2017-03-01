//Theme is "Movies I've seen."
var topics =["The Lego Movie", "Star Wars", "Ghostbusters", "Lord of the Rings", "Robocop", "Jurassic Park", "Terminator 2", "The Pincess Bride", "Back to the Future", "Batman", "Harry Potter", "Men In Black", "Hidden Figures", "Captain America: The First Avenger", "Indiana Jones and the Last Crusade", "Muppet Treasure Island", "Labyrinth", "Superman", "Spaceballs", "2001: A Space Odyssey", "Watership Down", "Nightmare Before Christmas", "The Sixth Sense", "Rogue One: Star Wars Story"];

//Setting up a function to make the buttons.
function buttonMaker(){
	$("#buttons").empty();
	for (var i = 0; i < topics.length; i++) {
		var actualButtons =$("<button>");
		actualButtons.attr("class","btn-primary movies");
		actualButtons.attr("id", topics[i]);
		actualButtons.text(topics[i]);
		$("#buttons").append(actualButtons);
	}
}

//What happens on page load. Which is basically just generating the buttons
//from the list of movies.
$(document).ready(function(){
	buttonMaker();
});

//What happens when adding a movie to the list. The text box clears, as well.
$(document).on("click", "#addMovie", function(event){
	event.preventDefault();
	var newOne = $("#newMovie").val().trim();
	topics.push(newOne);
	buttonMaker();
	$("#newMovie").val("");
});

//Telling AJAX to get the gifs.
$(document).on("click", ".movies", function(){
	$("#display").empty();
	var title = $(this).attr("id");
	var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + title + 
	"&api_key=dc6zaTOxFJmzC&limit=10";
	$.ajax({
		url: queryUrl,
		method: "GET",
	}).done(function(response){
		console.log(response);
		var results = response.data;
		console.log(results);
		for (var j = 0; j < results.length; j++) {
			var pretty = $("<div>");
			pretty.attr("class", "col-sm-4 col-lg-3 text-center");
			var rate = $("<h4>");
			rate.text(results[j].rating);
			pretty.append(rate);
			var pics = $("<img>");
			pics.attr("src", results[j].images.fixed_width_still.url);
			pics.attr("data-still", results[j].images.fixed_width_still.url);
			pics.attr("data-moving", results[j].images.fixed_width.url);
			pics.attr("data-status", "still");
			pics.addClass("motion");
			pretty.append(pics);
			$("#display").append(pretty);
		}
	});
});

//Getting the gifs to animate and go still again.
$(document).on("click", ".motion", function(){
	var status = $(this).attr("data-status");	
	if(status=="still"){
		$(this).attr("src", ($(this).attr("data-moving")));
		$(this).attr("data-status", "moving");
	} else{
		$(this).attr("src", ($(this).attr("data-still")));
		$(this).attr("data-status", "still");
	}
})
