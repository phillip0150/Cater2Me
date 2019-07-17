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
    if(req.user.userid === undefined){
      db.Events.findAll({
        where: {
          vendorid: null
        }
      }).then(function(caterdb){
        var hbsObject = {
          customer: caterdb
        };
        console.log("incustomer page");
        res.render("vendor-home", hbsObject);
      });
    }
    else {
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
        console.log("incustomer page");
        res.render("customer-home", hbsObject);
      });
    }
  });

  // vendor homepage
  app.get("/vendor/:id", isAuthenticated, function(req, res) {
    db.Events.findAll({
      where: {
        userid: null
      }
    }).then(function(caterdb){
      var hbsObject = {
        vendor: caterdb
      };
      res.render("vendorhome", hbsObject);
    });
  });

  //  create event page
  app.get("/event/create/:id", function(req,res){
    var hbsObject = {
      id: req.params.id
    };
    res.render("create-event", hbsObject);
  });

  app.get("*", function(req,res){
    res.render("404");
  });
};
