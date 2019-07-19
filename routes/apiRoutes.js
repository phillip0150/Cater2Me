var db = require("../models");
var passport = require("../config/passport");
// var passportVendor = require("../config/passportVendor");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

module.exports = function(app) {
  
  //Create user
  app.post("/api/createUser", function(req, res) {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).then(function(caterdb) {
      res.json(caterdb);
    });
  });


  //Look up user
  app.post("/api/login", passport.authenticate("local"), function(req,res){
    res.json(req.user);
  });
  
  //Create vendor
  app.post("/api/createVendor", function(req, res) {
    db.Vendor.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password
    }).then(function(caterdb) {
      res.json(caterdb);
    });
  });
  
  //Getting all events
  app.get("/api/events", function(req, res){
    db.Events.findAll({}).then(function(caterdb){
      //we are creating this object, because we want to send it to our handlebars
      var hbsObject = {
        event: caterdb
      };
      res.render("vendorhome", hbsObject);

    });
  });
  
  //Getting an event based on a user
  app.get("/api/events/:id", function(req,res){
    db.Events.findAll({
      where: {
        userid: req.params.id
      }
    }).then(function(caterdb) {
      //we are creating this object, because we want to send it to our handlebars
      var hbsObject = {
        event: caterdb
      };
      res.render("user", hbsObject);
    });
  });
  
  //Create Event
  app.post("/api/createEvent/:id", function(req, res) {
    db.Events.create({
      userid: req.params.id,
      vendorid: null,
      name: req.body.name,
      phone: req.body.phone,
      city: req.body.city,
      state: req.body.state,
      occasion: req.body.occasion,
      courses: req.body.courses,
      consideration: req.body.consideration,
      size: req.body.size,
      alcohol: req.body.size,
      decor: req.body.decor,
      comments: req.body.comments
    }).then(function(caterdb) {
      res.json(caterdb);
    });
  });
  
  
  // Lukes queries start------------------------------------------
  // get event by size----works------------------------------------
  app.get("/events/size/:size/:vendorid", function(req, res){
    db.Events.findAll({
      where: {
        vendorid: null,
        size: {
          [Op.lte]:[req.params.size]
        }
      }
    }).then(function(caterdb) {
      var nullVendorEvents = {
        events: caterdb
      };
      db.Events.findAll({
        where: {
          vendorid: req.params.vendorid
        }
      }).then(function(morecaterdb){
        var acceptedEvents = {
          events: morecaterdb
        };
        res.render("vendor-home", {accepted: acceptedEvents, available: nullVendorEvents});

      });

    });
  });
  
  // get event by state-----------------------works--------------------------
  app.get("/events/state/:state/:vendorid", function(req, res){
    db.Events.findAll({
      where: {
        vendorid: null,
        state: req.params.state
      }
    }).then(function(caterdb) {
      var nullVendorEvents = {
        events: caterdb
      };
      db.Events.findAll({
        where: {
          vendorid: req.params.vendorid
        }
      }).then(function(morecaterdb){
        var acceptedEvents = {
          events: morecaterdb
        };
        res.render("vendor-home", {accepted: acceptedEvents, available: nullVendorEvents});

      });

    });
  });

  // get event by decor needed ------------------does work, 0 = false 1 = true-------------------------
  app.get("/api/events/decor/:decor", function(req, res){
    db.Events.findAll({
      where: {
        decor:req.params.decor
      }      
    }).then(function(caterdb){
      //we are creating this object, because we want to send it to our handlebars
      var hbsObject = {
        event: caterdb
      };
      res.render("vendor", hbsObject);
      res.json(caterdb);
    });
  });
  // get event by booze needed
  //multiple queries at once
};
