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
    db.Events.findAll({
      where: {
        vendorid: null
      }
    }).then(function(caterdb) {
     
      // var availableArr = [];
      // var vendorArr = [];
      var nullVendorEvents = {
        events: caterdb
      };

      db.Events.findAll({
        where: {
          vendorid: req.params.id
        }
      }).then(function(morecaterdb){
        var acceptedEvents = {
          events: morecaterdb
        };
      
        db.Vendor.findOne({
          where: {
            vendorid: req.params.id
          }
        }).then(function(userData) {
          console.log(userData.name);
          var vendorName = userData.name;

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
