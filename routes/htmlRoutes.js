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
  app.get("/vendor/:vendorid", isAuthenticated, function(req,res){
    //Ask DB to find all events available where there are no vendors assigned
    db.Events.findAll({
      where: {
        vendorid: null
      }
    }).then(function(caterdb) {
      //Making object with all events with no vendor
      var nullVendorEvents = {
        events: caterdb
      };

      //Find all events that have the same vendor id as the params.id
      db.Events.findAll({
        where: {
          vendorid: req.params.vendorid
        }
      }).then(function(morecaterdb){
        //Making object with vendor's events
        var acceptedEvents = {
          events: morecaterdb
        };

        //Find vendor where vendor id = params.id      
        db.Vendor.findOne({
          where: {
            vendorid: req.params.vendorid
          }
        }).then(function(userData) {
          // console.log(userData.name);
          //Getting vendor name from DB
          var vendorName = userData.name;
          //Send available and accepted events, and the vendor name to the page
          res.render("vendor-home", {
            accepted: acceptedEvents, 
            available: nullVendorEvents, 
            vendorName: vendorName
          });
        });
      });
    });
  });

  //  create event page
  app.get("/event/create/:id", function(req,res){
    var hbsObject = {
      id: req.params.id
    };
    res.render("create-event", hbsObject);
  });

  app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });

  app.get("/event/:id", function(req, res) {
    db.Events.findOne({
      where: {
        eventid: req.params.id
      }
    }).then(function(caterdb) {
      //we are creating this object, because we want to send it to our handlebars
      var hbsObject = {
        event: caterdb
      };
      res.render("event", hbsObject);
    });
  });

  app.get("/event/edit/:id", function(req, res) {
    db.Events.findOne({
      where: {
        eventid: req.params.id
      }
    }).then(function(caterdb) {
      //we are creating this object, because we want to send it to our handlebars
      var hbsObject = {
        event: caterdb
      };
      res.render("editevent", hbsObject);
    });
  });
  
  app.get("*", function(req,res){
    res.render("404");
  });

};
