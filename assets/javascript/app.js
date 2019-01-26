//topics for gifs
var topics = ["doughnut", "pizza", "cake", "pancakes", "bacon"];

function renderButtons()
{
    $("#gif-view").empty();

    for(i = 0; i < topics.length; i++)
    {
        var gifButton = $("<button>");
        gifButton.addClass("btn btn-info");
        gifButton.attr("gif-data", topics[i]);
        gifButton.text(topics[i]);
        $("#gif-view").append(gifButton);
    }
}

$("#add-gif").on("click", function(event)
{
    event.preventDefault();
    var searchTerm = $("#Search-Input").val().trim();
    if(searchTerm == "")
    {
        $("#Search-Input").val("");
    }
    else
    {
        topics.push(searchTerm);
        $("#Search-Input").val("");
        renderButtons();
    }
});

renderButtons();