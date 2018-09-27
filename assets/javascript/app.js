// $("document").ready(function() {

  var topics = ["ferrari", "lamborghini", "alfa romeo", "mercedes-benz", "bmw", "pagani", "mclaren", "porsche"];
  var numGifs = 10;
  var currentTopic;
  var currentOffset = 0;

  function generateButtons() {
    for (var i = 0; i < topics.length; i++) {
      var newButton = $("<button>");
      newButton.attr("class", "btn btn-info");
      newButton.text(topics[i]);
      $("#button-container").append(newButton);
    }
  };

  generateButtons();

  function addMoreGifs() {
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Rt7I8O5meHI6cuUpOtEv1IcwnovntCJK&q=" + currentTopic + "&limit=" + numGifs + "&offset=" + currentOffset;

    $.ajax({
      method: "GET",
      url: queryURL
    }).then(function(response) {
      console.log(response);
      for (var i = 0; i < numGifs; i++) {
        var stillURL = response.data[i].images.fixed_height_still.url;
        var animateURL = response.data[i].images.fixed_height.url;
        var newDiv = $("<div>");
        var newGif = $("<img>");
        var newGifRating = $("<p class='text-center'>");
        newGifRating.text("Rating: " + response.data[i].rating.toUpperCase());
        newGif.attr("src", stillURL).attr("data-still", stillURL).attr("data-animate", animateURL).attr("data-state", "still");
        newDiv.append(newGif).append(newGifRating);
        $("#gif-container").prepend(newDiv);
      };
    });
  }

  $("div#button-container").on("click", "button", function() {

    $("#gif-container").empty();

    currentTopic = $(this).text();

    currentOffset = 0;

    addMoreGifs();
  });

  $("button#add-more").on("click", function(event) {
    event.preventDefault();
    if (currentTopic) {
      currentOffset += numGifs;
      addMoreGifs();
    }
  });

  $("div#gif-container").on("click", "img", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    };
    if (state === "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    };
  });

  $("button#add-new").on("click", function(event) {
    event.preventDefault();
    var newValue = $("#new-value").val().trim();
    if (newValue.length > 0 && topics.includes(newValue) === false) {
      $("#button-container").empty();
      topics.push($("#new-value").val().trim());
      generateButtons();
    };
  });
  

  
// });