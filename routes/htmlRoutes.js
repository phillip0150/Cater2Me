var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
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
      console.log("in customer page");
      res.render("customer-home", hbsObject);
    });
    // }
  });

  //Vendor homepage handlebars
  //TODO add isAuthenticated when finished testing
  app.get("/vendor/:id", isAuthenticated, function(req,res){
    //Ask DB to find all events available
    db.Events.findAll({
      where: {
        vendorid: null
      }
    }).then(function(caterdb) {
      var allEvents = {
        events: caterdb,
        vendorid: req.params.id
      };
    
      res.render("vendor-home", allEvents);
    });
  });

  //  create event page
  app.get("/event/create/:id", function(req,res){
    var hbsObject = {
      id: req.params.id
    };
    res.render("create-event", hbsObject);
  });

  // search events by
  app.get("/events/size/:size/:vendorid", function(req, res){
    db.Events.findAll({
      where: {
        size: {
          //size less than or = to params
          [Op.lte]:[req.params.size]
        },
        vendorid: null
      }
    }).then(function(caterdb){
      //we are creating this object, because we want to send it to our handlebars
      var hbsObject = {
        events: caterdb,
        vendorid: req.params.vendorid
      };
      console.log(hbsObject.vendorid);
      res.render("vendor-home", hbsObject);
    });
  });

  // get event by state-----------------------works--------------------------
  app.get("/events/state/:state/:vendorid", function(req, res){
    db.Events.findAll({
      where: {
        state:req.params.state
          
      }
    }).then(function(caterdb){
      //we are creating this object, because we want to send it to our handlebars
      var hbsObject = {
        event: caterdb
      };
      res.render("vendor-home", hbsObject);
  
    });
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
  
  app.get("*", function(req,res){
    res.render("404");
  });

};
