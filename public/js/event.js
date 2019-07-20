$("#eventAccept").on("click" ,function (){
           
  var vendorId = $(this).attr("vendor-id");
  var eventId = $(this).attr("event-id");
  var eventUpdate = {
    vendorid: vendorId,
    eventid: eventId
  };

  console.log("VENDOR ID: " + vendorId);
  console.log("EVENT ID: " + eventId);

  $.ajax("/api/event/" + eventId + "/" + vendorId, {
    type: "PUT",
    data: eventUpdate
  }).always(function () {
    window.location.href= "/vendor/"+vendorId;
  });
});
  
