var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var isAuthenticatedVendor = require("../config/middleware/isAuthenticatedVendor");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

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
      db.Events.findAll({
        where: {
          userid: req.user.userid,
          customerAccept: false,
          vendorid: {
            [Op.gt]: 0
          }
        
        }
      }).then(function(vendorInfo){
        var otherObject = {
          vendor: vendorInfo
        };
        db.Events.findAll({
          where: {
            userid: req.user.userid,
            customerAccept: true,
            vendorid: {
              [Op.ne]: null
            }
          }
        }).then(function(acceptedJobs){
          var otherOtherObject = {
            events: acceptedJobs
          };
          console.log("in customer page");
          res.render("customer-home", {customer: hbsObject, vendor: otherObject, accepted: otherOtherObject});
        });
       
      });
      
    });
    // }
  });

  //Vendor homepage handlebars
  //TODO add isAuthenticatedVendor when finished testing
  app.get("/vendor/:id", isAuthenticatedVendor, function(req,res){
    //Ask DB to find all events available where there are no vendors assigned
    db.Events.findAll({
      where: {
        vendorid: null
      }
    }).then(function(caterdb) {
     
      
      var nullVendorEvents = {
        events: caterdb
      };
      //finding all events with vendorid
      db.Events.findAll({
        where: {
          vendorid: req.params.id,
          customerAccept: true
        }
      }).then(function(morecaterdb){
        var acceptedEvents = {
          events: morecaterdb
        };
        //finding vendor with current vendorid id
        db.Vendor.findOne({
          where: {
            vendorid: req.params.id
          }
        }).then(function(userData) {
          console.log(userData.name);
          var vendorInfo = {
            vendor: userData
          };
          db.Events.findAll({
            where: {
              vendorid: req.params.id,
              customerAccept: false
            }
          }).then(function(vendorEventData){
            var pendingEvents = {
              pendingCurrent: vendorEventData
            };
            console.log(pendingEvents);
            res.render("vendor-home", {
              accepted: acceptedEvents, 
              available: nullVendorEvents, 
              pending: pendingEvents,
              vendorInfo: vendorInfo
            });

          
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

  //customer veiwing vendor profile

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

  //customer viewing event
  app.get("/event/:id/", isAuthenticated, function(req, res) {
    db.Events.findOne({
      where: {
        eventid: req.params.id
      }
    }).then(function(caterdb) {
      //we are creating this object, because we want to send it to our handlebars
      var hbsObject = {
        event: caterdb,
      };
      res.render("eventCustomer", hbsObject);
    });
  });

  //customer editing event
  app.get("/customer/event/edit/:id/", isAuthenticated, function(req, res) {
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

  app.get("/customer/:customerid/vendorview/:vendorid", function(req,res) {
    db.Vendor.findOne({
      where: {
        vendorid: req.params.vendorid
      }
    }).then(function(caterdb){
      var hbsObject ={
        vendorInfo: caterdb,
        customerid: req.params.customerid
      };
      res.render("vendor-profile", hbsObject);
    });
  });
  
  app.get("*", function(req,res){
    res.render("404");
  });

};
