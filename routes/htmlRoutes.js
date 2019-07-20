var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var isAuthenticatedVendor = require("../config/middleware/isAuthenticatedVendor");

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
  app.get("/vendor/:id",isAuthenticatedVendor, function(req,res){
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
          var vendorInfo = {
            vendor: userData
          };

          res.render("vendor-home", {
            accepted: acceptedEvents, 
            available: nullVendorEvents, 
            vendorInfo: vendorInfo
          });
        });
      });
    });
  });

  //  create event page
  app.get("/event/create/:id", isAuthenticated, function(req,res){
    var hbsObject = {
      id: req.params.id
    };
    res.render("create-event", hbsObject);
  });

  app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });

  //vendor veiwing event
  app.get("/event/:id/:vendorid", isAuthenticatedVendor, function(req, res) {
    db.Events.findOne({
      where: {
        eventid: req.params.id
      }
    }).then(function(caterdb) {
      //we are creating this object, because we want to send it to our handlebars
      var hbsObject = {
        event: caterdb,
        vendorid: req.params.vendorid
      };
      res.render("event", hbsObject);
    });
  });

  app.get("/event/edit/:id", isAuthenticated, function(req, res) {
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
