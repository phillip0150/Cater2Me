$("#eventAccept").on("click" ,function (){
  console.log("I've been clicked");

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

$("#homeCustomer").on("click" ,function (){
  window.location.href= "/customer/";
});


$("#homeVendor").on("click" ,function (){          
  window.location.href= "/vendor/"+$("#homeVendor").attr("vendor-ID");
});

$("#homeVendorbottom").on("click", function (){
  console.log("I've been clicked!");
});