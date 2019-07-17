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
        email: req.body.email,
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
      // db.Events.findAll({
      //   where: {
      //     vendorid: req.params.id
      //   }
      // }).then(function(caterdb) {
      var vendorArr = [];
      caterdb.forEach(function(elem) {
        if (elem.vendorid == req.params.id) {
          console.log(elem.occasion)
          vendorArr.push(elem);
        }
      });

      // var vendorArr = caterdb.filter(function(elem) {
      //   return (elem.vendorid === req.params.id);
      // })


      var vendorEvents = {
        vendor: vendorArr
      };


      console.log(vendorEvents)
      console.log(allEvents)
      
      res.render("vendorhome", {accepted: vendorEvents, available: allEvents});

      // });
      

    });

  });

    
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

};
