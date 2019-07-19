$(".vendorAcceptBtn").on("click", function () {
  
  var vendorId = $(".vendorAcceptBtn").attr("vendor-id");
  var eventId = $(".vendorAcceptBtn").attr("event-id");
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