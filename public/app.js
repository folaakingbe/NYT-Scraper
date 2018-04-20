$(document).on('click','.note',function(){
    // alert( 'success' );
    // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      console.log(data.note);
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
 });

 $(document).on("click", ".save", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    console.log(thisId);
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

  $(document).on("click", ".saved", function() {
    var thisId = $(this).attr("data-id");
    var savedArticle = $(this).attr("data-saved");
    var newSavedArticle;
    console.log(thisId, savedArticle);
    if (savedArticle == "true") {
      newSavedArticle = false;
    }
    else {
      newSavedArticle = true;
    }
    console.log(newSavedArticle);
    $.ajax({
      method: "PUT",
      url: "/saved/" + thisId,
      data: {
        // Value taken from title input
        saved: newSavedArticle
      }
    })
    .then(
      function() {
        console.log("changed saved to", newSavedArticle);
        location.reload();
      }
    )
  });