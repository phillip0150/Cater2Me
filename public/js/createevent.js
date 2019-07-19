$(function () {

  //if they click on the button in the create vendor form, 
  //create var to store values





  //send those values to /api/createVendor
  $(".create-event").on("submit", function (event) {
    event.preventDefault();
    var theUserId = $("#userid").val();
    var newEvent = {
      userid: $("#userid").val(),
      name: $("#name").val().trim(),
      phone: $("#phone").val().trim(),
      city: $("#city").val().trim(),
      state: $("#state").val().trim(),
      occasion: $("#occasion").val().trim(),
      courses: $("#courses").val().trim(),
      consideration: $("#consideration").val().trim(),
      size: $("#size").val(),
      alcohol: $("#alcohol").val(),
      decor: $("#decor").val().trim(),
      comments: $("#comments").val().trim()
    };
    
    console.log(newEvent);

    $.ajax("/api/createEvent/" + theUserId, {
      type: "POST",
      data: newEvent
    }).then(
      function () {
        console.log("created a new event!");
        window.location.href = "/customer";
      }
    );
  });



});