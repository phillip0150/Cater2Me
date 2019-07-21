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
      password: req.body.password,
      food: req.body.food,
      aboutme: req.body.aboutme,
      userphoto: req.body.userphoto,
      photo1: req.body.photo1,
      photo2: req.body.photo2,
      photo3: req.body.photo3,
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
      date: req.body.date,
      time: req.body.time,
      comments: req.body.comments,

    }).then(function(caterdb) {
      res.json(caterdb);
    });
  });
  
  
  // get event by size-
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

        db.Vendor.findOne({
          where: {
            vendorid: req.params.vendorid
          }
        }).then(function(userData) {
          console.log(userData.name);
          var vendorInfo = {
            vendor: userData
          };
          res.render("vendor-home", {accepted: acceptedEvents, available: nullVendorEvents, vendorInfo: vendorInfo});

        });

      });
    });
  });
  
  // get event by state----
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
        db.Vendor.findOne({
          where: {
            vendorid: req.params.vendorid
          }
        }).then(function(userData) {
          console.log(userData.name);
          var vendorInfo = {
            vendor: userData
          };
        
          res.render("vendor-home", {accepted: acceptedEvents, available: nullVendorEvents, vendorInfo: vendorInfo});

        });

      });
    });
  });

  //getting event and editing it
  app.post("/api/event/edit/:id", function(req, res){
    db.Events.update({name: req.body.name,
      phone: req.body.phone,
      city: req.body.city,
      state: req.body.state,
      occasion: req.body.occasion,
      courses: req.body.courses,
      consideration: req.body.consideration,
      size: req.body.size,
      alcohol: req.body.size,
      decor: req.body.decor,
      date: req.body.date,
      time: req.body.time,
      comments: req.body.comments},{ where : { eventid : req.params.id }}).then(function(){
      res.redirect("/customer");
    });
   
  });
  
  //api to decline an event
  app.post("/api/event/decline/:eventId/:userId", function(req, res){
    db.Events.update({
      vendorid: null,
      customerAccept: false
    },
    {
      where:{
        userid: req.params.userId,
        eventid: req.params.eventId
      }
    }).then(function(){
      res.redirect("/customer");
    });
  });

  //api to accept an event
  app.post("/api/event/accept/:eventId/:userId", function(req, res){
    db.Events.update({
      customerAccept: true
    },
    {
      where:{
        userid: req.params.userId,
        eventid: req.params.eventId
      }
    }).then(function(){
      res.redirect("/customer");
    });
  });
  
};
