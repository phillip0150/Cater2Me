$(function() {

  //first we are hiding both forms for the user and vendor
  $(".create-user").hide();
  $(".create-vendor").hide();

  //if someone clicks on the customer button, we know they want to create a customer
  $("#customerButton").on("click", function(event) {
    event.preventDefault();
    //show user, hide vendor
    $(".create-user").show();
    $(".create-vendor").hide();
    $(".userTypeBtns").hide();
  });

  //if someone clicks on teh vendor button, we know they want to create a vendor
  $("#vendorButton").on("click", function(event) {
    event.preventDefault();
    //show vendor, hide user
    $(".create-vendor").show();
    $(".create-user").hide();
    $(".userTypeBtns").hide();
  });

  //if they click on the button in the create user form, 
  //create var to store values
  //send those values to /api/createUser
  $(".create-user").on("submit", function(event) {
    event.preventDefault();

    var newUser = {
      name: $("#nameUser").val().trim(),
      email: $("#emailUser").val().trim(),
      password: $("#passwordUser").val().trim()
    };

    console.log(newUser);

    $.ajax("/api/createUser", {
      type: "POST",
      data: newUser
    }).then(
      function() {
        console.log("created a new user!");
        //TODO: When we create a user, should we take them to the homepage to login with their new info?
        location.reload();
      }
    );
  });

  //if they click on the button in the create vendor form, 
  //create var to store values
  //send those values to /api/createVendor
  $(".create-vendor").on("submit", function(event) {
    event.preventDefault();

    var newVendor = {
      name: $("#nameVendor").val().trim(),
      email: $("#emailVendor").val().trim(),
      password: $("#passwordVendor").val().trim(),
      phone: $("#phone").val().trim()
    };

    console.log(newVendor);

    $.ajax("/api/createVendor", {
      type: "POST",
      data: newVendor
    }).then(
      function() {
        console.log("created a new user!");
        //TODO: When we create a vendor, should we take them to the homepage to login with their new info?
        window.location.href = "/customer";
      }
    );
  });

});