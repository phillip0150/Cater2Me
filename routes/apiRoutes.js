var db = require("../models");

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
  
  //Geting all events
  app.get("/api/events", function(req, res){
    db.Event.findAll({}).then(function(caterdb){
      //we are creating this object, because we want to send it to our handlebars
      var hbsObject = {
        event: caterdb
      };
      res.render("vendorhome", hbsObject);
    });
  });
  
  //Getting an event based on a user
  app.get("/api/events/:id", function(req,res){
    db.Event.findAll({
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
    db.Event.create({
      userid: req.params.id,
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
  
  //Look at event
  app.get("/api/event/:id", function(req, res) {
    db.Event.findOne({
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
  
  
};
