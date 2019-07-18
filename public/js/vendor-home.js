// $(document).ready(function () {
var placeArray = (window.location.pathname).split("/");
var vendorId = placeArray.slice(-1)[0];
console.log("VENDOR ID OUTSIDE CLICK FUNCTION: " + vendorId);

// All "Accept" buttons have a vendor-id that matches the vendorId
$(".vendorAcceptBtn").attr("vendor-id", vendorId);

//When any "Accept" button is clicked...
$(".vendorAcceptBtn").on("click", function () {

  var vendorId = $(this).attr("vendor-id");
  var eventId = $(this).attr("event-id");
  var eventUpdate = {
    vendorid: vendorId,
    eventid: eventId
  };

  //   console.log("VENDOR ID: " + vendorId);
  //   console.log("EVENT ID: " + eventId);

  $.ajax("/api/event/", {
    type: "PUT",
    data: eventUpdate
  }).then(function () {
    // location.reload();
  });
});

$(".moreInfoBtn").on("click", function () {
  console.log("I've been clicked");
  var btnID = ($(this).attr("data-id"));
  console.log(btnID);
  window.location.href = "/event/" + btnID;
});

// });