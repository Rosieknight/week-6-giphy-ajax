//Theme is "Movies I've seen."
var starter =["The Lego Movie", "Star Wars", "Ghostbusters", "Lord of the Rings", "Robocop", "Jurassic Park", "Terminator 2", "The Pincess Bride", "Back to the Future", "Batman", "Harry Potter", "Men In Black", "Hidden Figures", "Captain America: The First Avenger", "Indiana Jones and the Last Crusade", "Muppet Treasure Island", "Labyrinth", "Superman", "Spaceballs", "2001: A Space Odyssey", "Watership Down", "Nightmare Before Christmas", "The Sixth Sense", "Rogue One: Star Wars Story"];

//Setting up a function to make the buttons.
function buttonMaker(){
	$("#buttons").empty();
	for (var i = 0; i < starter.length; i++) {
		var actualButtons =$("<button>");
		actualButtons.attr("class","btn-primary movies");
		actualButtons.attr("id", starter[i]);
		actualButtons.text(starter[i]);
		$("#buttons").append(actualButtons);
	}
}

//What happens on page load. Which is basically just generating the buttons
//from the list of movies.
$(document).ready(function(){
	buttonMaker();
});

//What happens when adding a movie to the list. I want to clear out the textbox
//but that's not working at the movment.
$(document).on("click", "#addMovie", function(event){
	event.preventDefault();
	var newOne = $("#newMovie").val().trim();
	starter.push(newOne);
	buttonMaker();
});

//AJAX to get the gifs.
$(document).on("click", ".movies", function(){
	var title = $(this).attr("id");
	var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + title + 
	"&api_key=dc6zaTOxFJmzC";
	$.ajax({
		url: queryUrl,
		method: "GET",
	}).done(function(response){
		
	})

});