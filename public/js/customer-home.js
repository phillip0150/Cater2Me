$(document).ready(function() {

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
});