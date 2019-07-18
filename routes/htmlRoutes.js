var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {

  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/create", function(req, res) {
    res.render("create-acct");
  });


  // customer homepage
  app.get("/customer", isAuthenticated, function(req, res) {
    db.Events.findAll({
      where: {
        userid: req.user.userid
      }
    }).then(function(caterdb){
      var hbsObject = {
        customer: caterdb,
        name: req.user.name,
        userid: req.user.userid
      };
      console.log("in customer page");
      res.render("customer-home", hbsObject);
    });
    // }
  });

  //Vendor homepage handlebars
  //TODO add isAuthenticated when finished testing
  app.get("/vendor/:id", function(req,res){
    //Ask DB to find all events available where there are no vendors assigned
    db.Events.findAll({}).then(function(caterdb) {
     
      var availableArr = [];
      var vendorArr = [];

      //For each element, if the vendor id = the event table's vendor id 
      //then push that event to the vendorArr
      caterdb.forEach(function(obj) {
        if (obj.vendorid === null) {
          availableArr.push(obj);
        } 
      });

      caterdb.forEach(function(obj) {
        // eslint-disable-next-line eqeqeq
        if (obj.vendorid == req.params.id) {
          vendorArr.push(obj);
        } 
      });
      
      var allEvents = {
        events: availableArr
      };
  
      var vendorEvents = {
        events: vendorArr
      };

      console.log("VENDOR ARRAY: " + JSON.stringify(vendorArr));
      console.log("VENDOR EVENTS: " + JSON.stringify(vendorEvents));
      console.log("AVAILABLE EVENTS: " + JSON.stringify(allEvents));

      res.render("vendor-home", {accepted: vendorEvents, available: allEvents});
    });
  });

  //  create event page
  app.get("/event/create/:id", function(req,res){
    var hbsObject = {
      id: req.params.id
    };
    res.render("create-event", hbsObject);
  });

  app.get("/event/:id", function(req,res){
    res.render("event");
  });


  app.get("*", function(req,res){
    res.render("404");
  });

};