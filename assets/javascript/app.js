var list = ["Gordon Ramsay", "Barack Obama", "Beyoncé", "Emma Watson", "Keanu Reeves", "Donnie Yen", "Jackie Chan", "Jet Li", "Pewdiepie", "Dyrus", 
"John-117", "Mario", "Walter White","Micky Mouse", "Homer Simpson", "Ash Ketchum" ,"Kaneki Ken", "Midoriya Deku", "Lelouch Lamperouge", "Doge"];
/*
// Event listener for our cat-button
$("#cat-button").on("click", function() {
// Storing our giphy API URL for a random cat image
var queryURL = "https://api.giphy.com/v1/gifs/search?"; */
const api_KEY = "api_key=HXjPGl9EXf7b9vTRgGNZtlOIpWa3cQBm";
const limit = "&limit=10";
const offset = "&offset=0";
const rating = "&rating=PG";
const lang = "&lang=en";
/*var queryURL2 = "https://api.giphy.com/v1/gifs/search?api_key=HXjPGl9EXf7b9vTRgGNZtlOIpWa3cQBm&q=dog&limit=1&offset=0&rating=G&lang=en";
var queryURL3 = "https://api.giphy.com/v1/gifs/random?api_key=HXjPGl9EXf7b9vTRgGNZtlOIpWa3cQBm&tag=cat&rating=G";
var queryURL4 = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=HXjPGl9EXf7b9vTRgGNZtlOIpWa3cQBm";
*/

// When one of the person or character buttons are clicked
function displayPersonInfo() {
    // To remove previous images if there was any
    $(".person").remove();
    var search = "&q=" + $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HXjPGl9EXf7b9vTRgGNZtlOIpWa3cQBm" + search + limit + rating;

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
            var pOne = $("<p>").text("Rating: " + rating.toUpperCase());

            // Displaying the rating
            personDiv.append(pOne);

            // Retrieving the URL for the image
            var imgURL = response.data[i].images.downsized.url;
            var imgStillURL = response.data[i].images.downsized_still.url;

            // Creating an element to hold the image
            var image = $("<img>").attr("src", imgURL);

            // Giving img attributes so image can toggle between animated and still
            image.attr("data-state", "still");
            image.attr("data-animate", imgURL);
            image.attr("data-still", imgStillURL);

            // For the button the toggle the gif state
            image.addClass("gif");


            // Appending the image
            personDiv.append(image);

            // Putting the entire person above the previous person
            $("#images").append(personDiv);
            console.log(response.data);
        }
    });

    } // End of displayPersonInfo()

// Function for displaying all person or character buttons
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
        a.addClass("person-btn btn btn-default");
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