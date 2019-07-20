$(function () {

  //if they click on the button in the create vendor form, 
  //create var to store values


  // $("#wrongmodal").hide();

  // function error(){
  //   $("#wrongmodal").show();
  // }



  //send those values to /api/createVendor
  $("#submit").on("click", function (event) {
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
      size: $("#size").val().trim(),
      alcohol: $("#alcohol").val(),
      decor: $("#decor").val().trim(),
      date: $("#date").val().trim(),
      time: $("#time").val().trim(),
      comments: $("#comments").val().trim()
    };
    console.log(newEvent);

    $.ajax("/api/createEvent/" + theUserId, {
      type: "POST",
      data: newEvent
    }).always(
      function () {
        console.log("created a new event!");
        window.location.href = "/customer";
      }
    );
    

  });




});