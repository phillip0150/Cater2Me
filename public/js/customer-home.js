$(".moreInfoBtn").on("click", function () {
  console.log("I've been clicked");
  var btnID = ($(this).attr("data-id"));
  console.log(btnID);
  window.location.href = "/event/" + btnID;
});