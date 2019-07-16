var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/create", function(req, res) {
    res.render("create-acct");
  });


  //login user
  app.get("/login/user", function(req,res){
    db.User.findOne({
      where: {
        email: req.boyd.email,
        password: req.body.password
      }
    }).then(function(caterdb) {
      var hbsObject = {
        user: caterdb
      };
      res.render("user", hbsObject);
    });
  });

  //login vendor
  app.get("/login/vendor", function(req,res){
    db.Vendor.findOne({
      where: {
        email: req.boyd.email,
        password: req.body.password
      }
    }).then(function(caterdb) {
      var hbsObject = {
        vendor: caterdb
      };
      res.render("user", hbsObject);
    });
  });

  // Render 404 page for any unmatched routes
  app.get("/customer/:id", function(req, res) {
    db.Events.findAll({
      where: {
        userid: req.params.id
      }
    }).then(function(caterdb){
      var hbsObject = {
        customer: caterdb
      };
      res.render("customer-home", hbsObject);
    });
  });

  //  create event page
  app.get("/event/create", function(req,res){
    res.render("create-event");
  });

  app.get("/*", function(req,res){
    res.rend("404");
  });
};
