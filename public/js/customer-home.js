$(document).ready(function() {
  var theUserID = $(".cust-name").attr("user-info");
  
  $(".moreInfoBtn").on("click", function () {
    console.log("I've been clicked");
    var btnID = ($(this).attr("data-id"));
    console.log(btnID);
    window.location.href = "/event/" + btnID;
  });

  $(".editBtn").on("click", function () {
    console.log("I've been clicked");
    var eventID = ($(this).attr("data-id"));
    console.log(eventID);
    window.location.href = "/event/edit/" + eventID;
  });

  $(".declineBtn").on("click", function() {
    var eventID = ($(this).attr("data-id"));

    $.ajax("/api/event/decline/" + eventID + "/"+ theUserID, {
      type: "POST",
    }).then(
      function () {
        console.log("created a new event!");
        window.location.href = "/customer";
      }
    );
  });

  $(".acceptBtn").on("click", function() {
    var eventID = ($(this).attr("data-id"));

    $.ajax("/api/event/accept/" + eventID + "/"+ theUserID, {
      type: "POST",
    }).then(
      function () {
        console.log("created a new event!");
        window.location.href = "/customer";
      }
    );
  });
});
