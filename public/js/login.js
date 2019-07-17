$(function() {

  //if they click on the button in the create user form, 
  //create var to store values
  //send those values to /api/createUser
  $(".submitButton").on("click", function(event) {
    event.preventDefault();
    
    var userLogin = {
      email: $("#loginUsername").val().trim(),
      password: $("#loginPw").val().trim()
    };

    $.ajax("/api/login", {
      type: "POST",
      data: userLogin
    }).then(
      function(userdata) {
        console.log("hey user data" + userdata);
        //TODO: When we create a user, should we take them to the homepage to login with their new info?
        window.location.href = "/customer";      
      });
  });
 
  
});