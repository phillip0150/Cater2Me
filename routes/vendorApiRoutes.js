var db = require("../models");

// passport middleware

module.exports = function (app) {

  // app.get("/api/events", function (req, res) {
  //   // Here we add an "include" property to our options in our findAll query
  //   // We set the value to an array of the models we want to include in a left outer join
  //   // In this case, just db.Post
  //   db.Events.findAll({
  //     //   include: [db.Post]
  //   }).then(function (dbEvents) {
  //     res.json(dbEvents);
  //   });
  // });

  // app.get("/api/events/:people", function (req, res) {
  //   // Here we add an "include" property to our options in our findOne query
  //   // We set the value to an array of the models we want to include in a left outer join
  //   // In this case, just db.Post
  //   db.Events.findAll({
  //     where: {
  //       people: req.params.people
  //     },
  //     //   include: [db.Post]
  //   }).then(function (dbEvents) {
  //     res.json(dbEvents);
  //   });
  // });

  // app.get("/api/events/:price", function (req, res) {
  //   db.Events.findAll({
  //     where: {
  //       price: req.params.price
  //     },
  //     //   include: [db.Post]
  //   }).then(function (dbEvents) {
  //     res.json(dbEvents);
  //   });
  // });

  // app.get("/api/events/:category", function (req, res) {
  //   db.Events.findAll({
  //     where: {
  //       category: req.params.category
  //     },
  //     //   include: [db.Post]
  //   }).then(function (dbEvents) {
  //     res.json(dbEvents);
  //   });
  // });

  // app.post("/api/vendor/create", function (req, res) {
  //   db.Vendor.create({
  //     vendorid: req.user.id,
  //     name: req.body.name,
  //     phone: req.body.phone,
  //     email: req.body.email,
  //     password: req.body.password
  //   }).then(function () {
  //     res.json("vendor was created");
  //   });
  // });


  //
  // eslint-disable-next-line no-unused-vars
  app.put("/api/event/:eventid/:vendorid", function (req, res) {
    newEventVendor = req.params.vendoid;
    selectedEvent = req.params.eventid;
    console.log("NEW EVENT VENDOR IN POST: " + newEventVendor);
    console.log("SELECTED EVENT IN POST: " + selectedEvent);
    
    // console.log(res.json());

    db.Events.update(
      { vendorid : newEventVendor },
      { where: 
        { eventid: selectedEvent } 
      }
    );
  });
};

