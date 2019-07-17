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
    if(req.user.userid !== undefined){
      db.Events.findAll({
        where: {
          userid: req.user.userid
        }
      }).then(function(caterdb){
        var hbsObject = {
          customer: caterdb
        };
        console.log("incustomer page");
        res.render("customer-home", hbsObject);
      });
    }
    else {
      db.Events.findAll({
        where: {
          vendorid: req.user.vendorid
        }
      }).then(function(caterdb){
        var hbsObject = {
          customer: caterdb
        };
        console.log("incustomer page");
        res.render("customer-home", hbsObject);
      });
    }
  });

  // vendor homepage
  // app.get("/vendor/:id", isAuthenticated, function(req, res) {
  //   db.Events.findAll({
  //     where: {
  //       userid: null
  //     }
  //   }).then(function(caterdb){
  //     var hbsObject = {
  //       vendor: caterdb
  //     };
  //     res.render("vendorhome", hbsObject);
  //   });
  // });

  //login vendor
  app.get("/login/vendor", function(req,res){
    db.Vendor.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    }).then(function(caterdb) {
      var hbsObject = {
        vendor: caterdb
      };
      res.render("user", hbsObject); 
    });
  });

  app.get("/vendor/:id", function(req,res){
    db.Events.findAll({}).then(function(caterdb) {
      var allEvents = {
        event: caterdb
      };

      var vendorArr = [];
      caterdb.forEach(function(elem) {
        if (elem.vendorid == req.params.id) {
          console.log(elem.occasion)
          vendorArr.push(elem);
        }
      });
  
      var vendorEvents = {
        vendor: vendorArr
      };

      console.log(vendorEvents)
      console.log(allEvents)
      
      res.render("vendorhome", {accepted: vendorEvents, available: allEvents});
      
    });

  });

    
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

};
