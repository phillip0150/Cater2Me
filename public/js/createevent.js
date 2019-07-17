$(function() {

  
  function validateForm() {
    var x = document.getElementsByClassName(".create-event").value;
    if (x === "") {
      console.log("all fields must be filled out");
      return false;
    }
    console.log("validating")
  }
  //if they click on the button in the create vendor form, 
  //create var to store values
  //send those values to /api/createVendor
  $(".create-event").on("submit", function(event) {
    event.preventDefault();
    var theUserId = $("#userid").val();
    var newEvent = {
      userid: $("#userid").val(),
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
    validateForm();

    $.ajax("/api/createEvent/"+theUserId, {
      type: "POST",
      data: newEvent
    }).then(
      function() {
        console.log("created a new event!");
        window.location.href = "/customer";
      }
    );
  });
  
});