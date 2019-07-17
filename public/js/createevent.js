$(function() {

  
  //if they click on the button in the create vendor form, 
  //create var to store values
  //send those values to /api/createVendor
  $(".create-event").on("submit", function(event) {
    event.preventDefault();
    console.log("shit happens");

    var newEvent = {
      userid: $("#userid").val().trim(),
      phone: $("#phone").val().trim(),
      city: $("#city").val().trim(),
      state: $("#state").val().trim(),
      occasion: $("#occasion").val().trim(),
      courses: $("#courses").val().trim(),
      consideration: $("#consideration").val().trim(),
      size: $("#size").val(),
      // BOOLEAN 0=false 1=true
      alcohol: $("#alcohol").val(),
      // BOOLEAN 0=false 1=true
      decor: $("#decor").val().trim(),
      comments: $("#comments").val().trim()
    };
    console.log(newEvent);
  
    $.ajax("/api/createEvent/:id", {
      type: "POST",
      data: newEvent
    }).then(
      function() {
        console.log("created a new event!");
        location.reload();
      }
    );
  });
  
});