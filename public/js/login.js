
$(document).ready(function() {
  $("#wrongmodal").hide();

  function error(){
    $("#wrongmodal").show();
  }

  $(".close").on("click", function(event){
    event.preventDefault();
    $("#wrongmodal").hide();


  });
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
      data: userLogin,
      
    }).done(
      function(userdata) {
        if(userdata.vendorid) {
          window.location.href = "/vendor/" + userdata.vendorid;      
        } else {
          window.location.href = "/customer";      
        }
        //TODO: When we create a user, should we take them to the homepage to login with their new info?
      }).fail(function(){
      error();
    });
  });
 
  
});