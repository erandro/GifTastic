var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=94ios1WyJGMuPxT20oUQsWR1BFUCqS2m";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
});

var topics = ["basketball", "anime", "landscape architecture", "israel", "food", "coding"];

function renderButtons() {
    $("#buttonsHolder").empty();
    topics.forEach(function (topic) {
        var button = $("<button>").addClass("topicButton").attr("data-name", topic).text(topic);
        $("#buttonsHolder").append(button);
    });
}
renderButtons()

$("#add-topic").on("click", function (event) {
    event.preventDefault();
    var userTopic = $("#topic-input").val().trim();
    topics.push(userTopic);
    renderButtons();
});

function displayGifs() {
    var topic = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=94ios1WyJGMuPxT20oUQsWR1BFUCqS2m";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        for (var i = 0; i < 10; i++) {
            var box = $("<div>").addClass("gifBox")

            var gifRating = response.data[i].rating;
            var gifText = $("<p>").addClass("gifText").text("Rated - " + gifRating);
            $(box).append(gifText);

            var gifUrl = response.data[i].images.original.webp;
            var stillUrl = response.data[i].images["480w_still"].url;
            var gifImage = $("<img>").attr("src", stillUrl).addClass("gifItem").attr("data-animation", gifUrl).attr("data-still", stillUrl).attr("data-state", "still");
            $(box).prepend(gifImage);

            $("#gifHolder").prepend(box);
        }
    });
}

$(document).on("click", ".topicButton", displayGifs);


$(document).on("click", ".gifItem", function (event) {
    var gifItem = event.target
    var state = $(gifItem).attr("data-state");
    if (state === "still") {
        $(gifItem).attr("src", $(gifItem).attr("data-animation"));
        $(gifItem).attr("data-state", "animation");
    } else {
        $(gifItem).attr("src", $(gifItem).attr("data-still"));
        $(gifItem).attr("data-state", "still");
    }
});