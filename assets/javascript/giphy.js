$(document).ready(function () {
  // TV shows array
  var tvShows = ["Friends", "Gilmore Girls", "Scandal", "Buffy the Vampire Slayer", "Doug", "Full House", "Family Matters", "Martin", "Dawson's Creek", "The Fresh Prince of Bel-Air"];

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
      // Provided the initial button text
      btn.text(tvShows[i]);
      // Added the button to the buttons-view div
      $("#tvShowBtns").append(btn);
    };
  };
  // This function handles events where the add show button is clicked
  $("#add-show").on("click", function (event) {
    event.preventDefault();

    // This line of code will grab the input from the textbox
    var show = $("#show-input").val().trim();

    if ($('#show-input').val() === '') {
      $('#show-input').addClass('is-invalid');
      return false;
    }
    $('#show-input').removeClass('is-invalid');

    // The show from the textbox is then added to our array
    tvShows.push(show);

    // Calling renderButtons which handles the processing of our tv shows array
    renderButtons();

  });

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

  //displayShow function re-renders the HTML to display appropriate content
  function displayShow() {
    var showInput = $(this).attr('data-name');
    var queryURL =
      'https://api.giphy.com/v1/gifs/search?api_key=qVceYfjJGpS4ovfu8seNpK6Zg9i4atGR&q=' +
      showInput + "&limit=10";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function (gifData) {
      console.log(gifData);

      for (var j = 0; j < tvShows.length; j++) {
        var gifDiv = $('#tvShows');
        var showDiv = $('<div>');
        var showImg = $('<img>');

        showImg.attr('src', gifData.data[j].images.fixed_height_still.url);
        showImg.attr('alt', gifData.data[j].title);
        showImg.attr('data-still', gifData.data[j].images.fixed_height_still.url);
        showImg.attr('data-animate', gifData.data[j].images.fixed_height.url);
        showImg.attr('data-state', 'still');
        showImg.addClass('gif');
        showDiv.append('<p> Rating: ' + gifData.data[j].rating + '</p>');
        showDiv.append(showImg);
        gifDiv.prepend(showDiv);
      }
    });
  };
  //END CLICK EVENT

  //Still vs animate function
  $(document).on('click', '.gif', function () {
    var state = $(this).attr("data-state");

    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
  });

  $(document).on('click', '.show', displayShow);


});