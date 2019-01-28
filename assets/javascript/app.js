$(document).ready(function()
{

    //topics for gifs
    var topics = ["doughnut", "pizza", "cake", "pancakes", "bacon"];
    var gifData;
    var addMoreClicked = false;
    var limit = 10;
    var paragraph;
    var currentSearch;
    var gifDiv;

    //show gifs function
    function showgifs()
    {
        //get attribute of what button was pressed
        var search = $(this).attr("gif-data");
        
        if(!addMoreClicked)
        {
            currentSearch = search;
            limit = 10;
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&limit=10&api_key=rawxZ3PxzVxAGd3o7vfgr2yqNKtOtArY";

        //send ajax call to giphy
        $.ajax(
        {
            url: queryURL,
            method: "GET"
        }).then(function(responce)
        {
            gifData = responce;
            //empty gif div to not have duplicates
            $(".gifs").empty();
        
            //loop through the returned array
            for(i = 0; i < responce.data.length; i++)
            {
                //get the rating of the gif and the still image of the gif
                var rating = responce.data[i].rating;
                var stillGif = responce.data[i].images.original_still.url;
            
                //create a div for the p tag and the image add the div to the body
                gifDiv = $("<div>");
                // gifDiv.attr("id", i);
                paragraph = $("<p>");
                var gif = $("<img>");
                gifDiv.addClass("gifs");
                paragraph.attr("id", i);
                $(paragraph).text("");
                gif.attr("src", stillGif);
                gif.attr("value", 0);
                $(".col").append(gifDiv);
                $(gifDiv).append(gif);
                $(gifDiv).append(paragraph);

            }   
        });
    }
    else
    {
        //add 10 to limit
        limit += 10;

        //update queryurl with new limit
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentSearch + "&limit=" + limit + "&api_key=rawxZ3PxzVxAGd3o7vfgr2yqNKtOtArY";

        //send ajax call to giphy
        $.ajax(
            {
                url: queryURL,
                method: "GET"
            }).then(function(responce)
            {
                gifData = responce;
                //empty gif div to not have duplicates
                // $(".gifs").empty();
            
                //loop through the returned array
                for(i = limit-10; i < responce.data.length; i++)
                {
                    //get the rating of the gif and the still image of the gif
                    var rating = responce.data[i].rating;
                    var stillGif = responce.data[i].images.original_still.url;
                
                    //create a div for the p tag and the image add the div to the body
                    gifDiv = $("<div>");
                    // gifDiv.attr("id", i);
                    paragraph = $("<p>");
                    var gif = $("<img>");
                    gifDiv.addClass("gifs");
                    paragraph.attr("id", i);
                    $(paragraph).text("");
                    gif.attr("src", stillGif);
                    gif.attr("value", 0);
                    $(".col").append(gifDiv);
                    $(gifDiv).append(gif);
                    $(gifDiv).append(paragraph);
    
                }   
            });
        addMoreClicked = false;
    }
}


$(document).on("click", ".gifs", function(event)
{
        //get gif clicked on
        var gifclicked = event.target;

        //get id of gif
        var gifID = $(gifclicked).attr("id");
        
        //get value of gif
        var gifValue = $("#" + gifID).attr("value");
        
        //gif value 0 = not clicked(still)  1 = was clicked(animated)
        if(gifValue == 0)
        {   //id is array index
            //get animated gif
            var animatedgif = gifData.data[gifID].images.original.url;
            
            //change image to animated gif
            $("#" + gifID).attr("src", animatedgif);
            $("#" + gifID).attr("value", 1);
            
        }else if(gifValue == 1)
        {
            //get still image of gif
            var gifStill = gifData.data[gifID].images.original_still.url;
            
            //change image to to sill image
            $("#" + gifID).attr("src", gifStill);
            $("#" + gifID).attr("value", 0);
        }

    });

    //render buttons function
function renderButtons()
{
    //empty div so there are no repeates
    $("#gif-buttons").empty();
    
    //loop through the initial array making a button with a class of gifbutton and attribute of the name and put the string from the array on the button as text then add it to the body.
    for(i = 0; i < topics.length; i++)
    {
        var gifButton = $("<button>");
        gifButton.addClass("gifButton");
        gifButton.attr("gif-data", topics[i]);
        gifButton.text(topics[i]);
        $("#gif-buttons").append(gifButton);
    }
}

// check for clicks of items that are going to be crated into buttons
$("#add-gif").on("click", function(event)
{
    //stops page from reloading when button is pressed
    event.preventDefault();
    
    //get text from text input form
    var searchTerm = $("#Search-Input").val().trim();
    
    //check if text is empty
    if(searchTerm !== "")
    {
        // add to array and recall the function to render the buttons
        topics.push(searchTerm);
        $("#Search-Input").val("");
        renderButtons();
    }

});


//listen for clicks on the buttons of the search terms to show the gifs
$(document).on("click", ".gifButton", showgifs);

//checks for clicks on add more gifs button
$("#addMoreGifs").on("click", function(event)
{
    event.preventDefault();
    addMoreClicked = true;
    showgifs();
});

$(document).on("click", ".form-check-input", function(event)
{
    //check if checkbox is clicked
    if($("#gifRating").is(":checked"))
    {
        //loop through the array
        for(i = 0; i < gifData.data.length; i++)
        {
            //get the gif ratting
            var gifRating = gifData.data[i].rating;
            
            //put rating to text
            $("#" + i).text("Rating: " + gifRating);    
        }
    }
    else
    {
        //unclicked remove text
        for(i = 0; i < gifData.data.length; i++)
        {
            $("#" + i).text("");    
        }   
        
    }

});

renderButtons();
});