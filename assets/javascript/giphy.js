$(document).ready(function () {
  $('#add-show').on('click', function () {
    event.preventDefault();

    if ($('#show-input').val() === '') {
      $('#show-input').addClass('is-invalid');
      return false;
    }
    $('#show-input').removeClass('is-invalid');

    var showInput = $('#show-input').val();
    var queryURL =
      'https://api.giphy.com/v1/gifs/search?api_key=qVceYfjJGpS4ovfu8seNpK6Zg9i4atGR&q=' +
      showInput;

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function (gifData) {
      console.log(gifData);
      // printResults(nytData.response.docs);
    });
  });
  //END CLICK EVENT

  //PRINT RESULTS
  var tvShows = ["Friends", "Gilmore Girls", "Scandal", "Buffy the Vampire Slayer", "Doug", "Full House", "Family Matters", "Martin", "Dawson's Creek", "The Fresh Prince of Bel-Air"];

  // displayMovieInfo function re-renders the HTML to display the appropriate content
  // function displayShowInfo() {

  //   var movie = $(this).attr("data-name");
  //   var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  //   // Creates AJAX call for the specific movie button being clicked
  //   $.ajax({
  //     url: queryURL,
  //     method: "GET"
  //   }).then(function(response) {

  //     // YOUR CODE GOES HERE!!!

  //   });

  // }

  // Function for displaying tv show buttons
  function renderButtons() {

    // Deletes the shows prior to adding new shows
    // (this is necessary otherwise you will have repeat buttons)
    $("#tvShowBtns").empty();

    // Loops through the array of shows
    for (var i = 0; i < tvShows.length; i++) {

      // Then dynamicaly generates buttons for each show in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var btn = $("<button>");
      // Adds a class of show to our buttons
      btn.addClass("show");
      // Added a data-attribute
      btn.attr("data-name", tvShows[i]);
      // Added a data-state
      btn.attr("data-state", "still");
      // Provided the initial button text
      btn.text(tvShows[i]);
      // Added the button to the buttons-view div
      $("#tvShowBtns").append(btn);
    }
  }
  // This function handles events where the add show button is clicked
  $("#add-show").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var show = $("#show-input").val().trim();

    // The movie from the textbox is then added to our array
    tvShows.push(show);

    // Calling renderButtons which handles the processing of our tv shows array
    renderButtons();

  });

  // Adding click event listeners to all elements with a class of "movie"
  // $(document).on("click", ".show", displayShowInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();







































});