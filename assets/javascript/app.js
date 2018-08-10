$(document).ready(function(){

// Event listener for our cat-button
    $("#cat-button").on("click", function() {
    // Storing our giphy API URL for a random cat image
    var queryURL = "https://api.giphy.com/v1/gifs/search?";
    const api_KEY = "api_key=HXjPGl9EXf7b9vTRgGNZtlOIpWa3cQBm";
    var search = "&q=dog"; // We will have have to get this from the user input
    const limit = "&limit=10";
    const offset = "&offset=0";
    const rating = "&rating=G";
    const lang = "&lang=en";
    var queryURL2 = "https://api.giphy.com/v1/gifs/search?api_key=HXjPGl9EXf7b9vTRgGNZtlOIpWa3cQBm&q=dog&limit=1&offset=0&rating=G&lang=en";
    var queryURL3 = "https://api.giphy.com/v1/gifs/random?api_key=HXjPGl9EXf7b9vTRgGNZtlOIpWa3cQBm&tag=cat&rating=G";
    var queryURL4 = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=HXjPGl9EXf7b9vTRgGNZtlOIpWa3cQBm";

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
        image.classList.add("gif"); */
        // Prepending the image to the images div
        $("#images").prepend(image);
        console.log(response.data);
        console.log(imageUrl);
        });
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


})