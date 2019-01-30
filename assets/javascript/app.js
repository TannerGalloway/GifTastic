$(document).ready(function()
{

    //topics for gifs
    var topics = ["doughnut", "pizza", "cake", "pancakes", "bacon"];
    var gifData;
    var addMoreClicked = false;
    var limit = 10;
    var paragraphRating;
    var paragraphTitle;
    var currentSearch;
    var gifDiv;
    setInterval(TextCheck, 500); //timer runs ever half second to  disable button if no search term is made or checkboxes are clicked
    var searchTerm;
    var form = document.getElementById("gifControler");
    // var favorites = document.getElementById("favorites");
    // var favSelected = false;

    //show gifs function
    function showgifs()
    {
        //get attribute of what button was pressed
        var search = $(this).attr("gif-data");
        
        if(!addMoreClicked)
        {
            currentSearch = search;
            limit = 10;
            var GifqueryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&limit=10&api_key=rawxZ3PxzVxAGd3o7vfgr2yqNKtOtArY";

        //send ajax call to giphy
        $.ajax(
        {
            url: GifqueryURL,
            method: "GET"
        }).then(function(responce)
        {
            console.log(responce);
            gifData = responce;
            //empty gif div to not have duplicates
            $(".gifs").empty();
        
            //loop through the returned array
            for(i = 0; i < responce.data.length; i++)
            {
                //get the rating of the gif and the still image of the gif
                var gifRating = responce.data[i].rating;
                var stillGif = responce.data[i].images.original_still.url;
                var gifTitle = responce.data[i].title;
            
                //create a div for the p tag and the image add the div to the body
                gifDiv = $("<div>").addClass("gifs");
                
                //create a check box
                var checkoxDivFav = $("<div>").addClass("form-check"); 
                var checkboxFav = $("<input>").addClass("form-check-input");
                checkboxFav.attr("type", "checkbox");
                checkboxFav.attr("id", "favCheckbox_" + i);
                
                //add label to check box
                var favlabel = $("<label>").addClass("form-check-label");
                favlabel.attr("for", "favCheckbox_" + i);
                favlabel.text("Favorite");

                //create paragraph below image
                paragraphRating = $("<p>").addClass("hideRating");
                paragraphTitle = $("<p>").addClass("hideTitle");
                $(paragraphTitle).text(gifTitle);
                $(paragraphRating).text("Rating: " + gifRating);

                //create imaage
                var gif = $("<img>");
                
                //make image the gif
                gif.attr("src", stillGif);
                gif.attr("value", 0);
                gif.attr("id", i);

                //display to screen/append to the html 
                $(".col").append(gifDiv);
                $(gifDiv).append(gif);
                $(gifDiv).append(checkoxDivFav);
                $(checkoxDivFav).append(checkboxFav);
                $(checkoxDivFav).append(favlabel);
                $(gifDiv).append(paragraphTitle);
                $(gifDiv).append(paragraphRating);
                

            }   
        });
    }
    else
    {
        //add 10 to limit
        limit += 10;

        //update queryurl with new limit
        var GifqueryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentSearch + "&limit=" + limit + "&api_key=rawxZ3PxzVxAGd3o7vfgr2yqNKtOtArY";

        //send ajax call to giphy
        $.ajax(
            {
                url: GifqueryURL,
                method: "GET"
            }).then(function(responce)
            {
                gifData = responce;
            
                //loop through the returned array
                for(i = limit-10; i < responce.data.length; i++)
                {
                   //get the rating of the gif and the still image of the gif
                    var gifRating = responce.data[i].rating;
                    var stillGif = responce.data[i].images.original_still.url;
                    var gifTitle = responce.data[i].title;
                
                    //create a div for the p tag and the image add the div to the body
                    gifDiv = $("<div>").addClass("gifs");
                
                    //create a check box
                    var checkoxDivFav = $("<div>").addClass("form-check");
                    var checkboxFav = $("<input>").addClass("form-check-input");
                    checkboxFav.attr("type", "checkbox");
                    checkboxFav.attr("id", "box" + i);
                    checkboxFav.attr("id", "favCheckbox_" + i);
                
                    //add label to check box
                    var favlabel = $("<label>").addClass("form-check-label");
                    favlabel.attr("for", "favCheckbox_" + i);
                    favlabel.text("Favorite");

                    //create paragraph below image
                    paragraphRating = $("<p>").addClass("hideRating");
                    paragraphTitle = $("<p>").addClass("hideTitle");
                    $(paragraphTitle).text(gifTitle);
                    $(paragraphRating).text("Rating: " + gifRating);

                    //create imaage
                    var gif = $("<img>");
                
                    //make image the gif
                    gif.attr("src", stillGif);
                    gif.attr("value", 0);
                    gif.attr("id", i);

                    //display to screen/appedn to the html 
                    $(".col").append(gifDiv);
                    $(gifDiv).append(gif);
                    $(gifDiv).append(checkoxDivFav);
                    $(checkoxDivFav).append(checkboxFav);
                    $(checkoxDivFav).append(favlabel);
                    $(gifDiv).append(paragraphTitle);
                    $(gifDiv).append(paragraphRating);
    
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

function TextCheck()
{
    //get text from text input form
    searchTerm = $("#Search-Input").val().trim();
    
    //check if search term is empty
    if(searchTerm == "")
    {
        //disable button
        $("#add-gif").attr("disabled", true);
    }
    else
    {   //enable button
        $("#add-gif").attr("disabled", false);
    }

    //check if one of the checkboxes is checked
    if($("#gifRating").is(":checked") || $("#gifTitle").is(":checked"))
    {
        //disable button
        $("#addMoreGifs").attr("disabled", true);
    }
    else 
    {   //enable button
        $("#addMoreGifs").attr("disabled", false);
    }
}

// check for clicks of items that are going to be crated into buttons
$("#add-gif").on("click", function(event)
{
    //stops page from reloading when button is pressed
    event.preventDefault();
    
    //get text from text input form
    searchTerm = $("#Search-Input").val().trim();
    
        // add to array and recall the function to render the buttons
        topics.push(searchTerm);
        $("#Search-Input").val("");
        renderButtons();

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

$(document).on("click", ".form-check-input", function()
{
    //check if rating checkbox was clicked
    if($("#gifRating").is(":checked"))
    {
        //change class
        $(".hideRating").attr("class", "showRating");
        return;
    }
    else
    {
        $(".showRating").attr("class", "hideRating");
        
    }

    //check if title check box was clicked
    if($("#gifTitle").is(":checked"))
    {
        //change class
        $(".hideTitle").attr("class", "showTitle");
        return;
    }
    else
    {
        $(".showTitle").attr("class", "hideTitle");   
    }

    //if movie checkbox id=s clicked
    if($("#movieCheck").is(":checked"))
    {
        //send a query ajax call to omdb api
        var movieQueryURL = "https://www.omdbapi.com/?t=" + currentSearch + "&y=&plot=short&apikey=trilogy";
        $.ajax({
            url: movieQueryURL,
            method: "GET"
        }).then(function(responce)
        {
            console.log(responce);
            $("#movieInfo").empty();
            var movieTitle = $("<h4>");
            movieTitle.attr("id", "movieTitle");
            movieTitle.text("Title: " + responce.Title);
            
            var movieDate = $("<p>");
            movieDate.attr("id", "movieDate");
            movieDate.text("Release Date: " + responce.Released);

            var movieGenre = $("<p>");
            movieGenre.attr("id", "movieGenre");
            movieGenre.text("Genre: " + responce.Genre);

            var movieRating = $("<p>");
            movieRating.attr("id", "movieRating");
            movieRating.text("Rated: " + responce.Rated);

            var moviePlot = $("<p>");
            moviePlot.attr("id", "moviePlot");
            moviePlot.text("Plot: " + responce.Plot);

            var moviePoster = $("<img>");
            moviePoster.attr("id", "moviePoster");
            moviePoster.attr("src", responce.Poster);

            //display movie
            $("#movieInfo").append(movieTitle);
            $("#movieInfo").append(movieDate);
            $("#movieInfo").append(movieGenre);
            $("#movieInfo").append(movieRating);
            $("#movieInfo").append(moviePlot);
            $("#movieInfo").append(moviePoster);
            

        });

    }
    

    //     //get id of check box that was clicked
    //     var checkboxId = $(this).attr("id");

    //     //check if the checkbox that was click was a favorite checkbox
    // for(i = 0; i < gifDiv.data.length; i++)
    // {
    //     if(checkboxId == "favCheckbox_" + i && $("#favCheckbox_" + i).is(":checked"))
    //     {
    //         favSelected = true;
    //     }
    //     else
    //     {
    //         favSelected = false;
    //     }
    // }

    // if(favSelected)
    // {
    // var favGifNum = 0;
    // //get end of id of checkbox
    // var boxId = $(this).attr("id").split("_");
    
    // //get src of the image associated with the checkbox
    // var favGifSrc = $("#" + boxId[1]).attr("src");

    // var favGif = $("<img>").addClass("favGifs");
    // favGif.attr("src", favGifSrc);
    // favGif.attr("id", "favGif" + favGifNum);
    // favGifNum++;
    // $("#favorites").append(favGif);
    // }
    // else if(!favSelected)
    // {
    //     console.log("hi");
    // }


});

//check if favorites  or movie button is clicked
// $("#favoritesButton").on("click", hide_showForm);
$("#movieButton").on("click", hide_showForm);

//hide/show form
function hide_showForm()
{
    if($("#movieButton").attr("value") == 0)
    {
        form.style.display = "none";
        $("#movieButton").attr("value", 1);
        hide_showmovie();
        $("#movieButton").text("Search");
    }
    else if($("#movieButton").attr("value") == 1)
    {
        form.style.display = "block";
        $("#movieButton").attr("value", 0);
        hide_showmovie();
        $("#movieButton").text("MovieInfo");
    }
}

function hide_showmovie()
{
    if($("#movieButton").attr("value") == 0)
    {
        movieInfo.style.display = "none";
    }
    else if($("#movieButton").attr("value") == 1)
    {
        movieInfo.style.display = "block";
    }
}


renderButtons();
});