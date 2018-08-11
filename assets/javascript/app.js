var list = ["Gordon Ramsay", "Barack Obama", "Beyoncé", "Emma Watson", "Keanu Reeves", "Donnie Yen", "Jackie Chan", "Jet Li", "Pewdiepie", "Dyrus", 
"John-117", "Mario", "Walter White","Micky Mouse", "Homer Simpson", "Ash Ketchum" ,"Midoriya Deku", "Lelouch Lamperouge", "Rintarou Okabe", "Doge"];
/*
// Event listener for our cat-button
$("#cat-button").on("click", function() {
// Storing our giphy API URL for a random cat image
var queryURL = "https://api.giphy.com/v1/gifs/search?"; */
const api_KEY = "api_key=HXjPGl9EXf7b9vTRgGNZtlOIpWa3cQBm";
const limit = "&limit=10";
const offset = "&offset=0";
const rating = "&rating=G";
const lang = "&lang=en";
var queryURL2 = "https://api.giphy.com/v1/gifs/search?api_key=HXjPGl9EXf7b9vTRgGNZtlOIpWa3cQBm&q=dog&limit=1&offset=0&rating=G&lang=en";
var queryURL3 = "https://api.giphy.com/v1/gifs/random?api_key=HXjPGl9EXf7b9vTRgGNZtlOIpWa3cQBm&tag=cat&rating=G";
var queryURL4 = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=HXjPGl9EXf7b9vTRgGNZtlOIpWa3cQBm";
/*
// Perfoming an AJAX GET request to our queryURL
$.ajax({
    //dataType: 'json',
    //contentType: 'json',
    //url: queryURL+api_KEY+search+limit+rating,
    url: queryURL2, // This is not working for some reason
    method: "GET"
})

// After the data from the AJAX request comes back
.then(function(response) {
    // Saving the image_original_url property
    var imageUrl = response.data[0].images.downsized.url;
    // Creating and storing an image tag
    var image = $("<img>");
    // Setting the image src attribute to imageUrl
    image.attr("src", imageUrl);
    image.attr("alt", "cat image");
    // Data-states of "Animate", "Still" and needs data-state
    /* image.attr("data-state", "animate");
    image.attr("data-animate", "");
    image.attr("data-still", "");
    image.classList.add("gif");
    // Prepending the image to the images div
    $("#images").prepend(image);
    console.log(response.data);
    console.log(imageUrl);
    });
});
*/

// When one of the person or character buttons are clicked
function displayPersonInfo() {
    // To remove previous images if there was any
    $(".person").remove();
    var search = "&q=" + $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HXjPGl9EXf7b9vTRgGNZtlOIpWa3cQBm" + search + limit;

    // Creating an AJAX call for the specific person button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        for (var i = 0; i < 10; i++) {
            // Creating a div to hold the person
            var personDiv = $("<div class='person'>");

            // Storing the rating data
            var rating = response.data[i].rating;

            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            personDiv.append(pOne);

            // Retrieving the URL for the image
            var imgURL = response.data[i].images.downsized.url;

            // Creating an element to hold the image
            var image = $("<img>").attr("src", imgURL);

            // Appending the image
            personDiv.append(image);

            // Putting the entire person above the previous person
            $("#images").prepend(personDiv);
            console.log(response.data);
        }
    });

    } // End of displayMovieInfo()

// Function for displaying movie data
function renderButtons() {

    // Deleting the list prior to adding new people or characters
    // (this is necessary otherwise you will have repeat buttons)
    $("#all-buttons").empty();

    // Looping through the array of people and characters
    for (var i = 0; i < list.length; i++) {

        // Then dynamicaly generating buttons for each person/character in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of person-btn to our button
        a.addClass("person-btn");
        // Adding a data-attribute
        a.attr("data-name", list[i]);
        // Providing the initial button text
        a.text(list[i]);
        // Adding the button to the buttons-view div
        $("#all-buttons").append(a);
    }
}

$("#add-person").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var person = $("#person-input").val().trim();

    // Adding person from the textbox to our array
    list.push(person);

    // Calling renderButtons which handles the processing of our person array
    renderButtons();

    // Clearing input
    document.getElementById("person-input").value= "";
});

$(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$(document).on("click", ".person-btn", displayPersonInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();