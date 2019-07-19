var db = require("../models");

// passport middleware

module.exports = function (app) {
  // Here we add an "include" property to our options in our findAll query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Post

  // UPDATE EVENT TO HAVE THE VENDOR'S ID
  // eslint-disable-next-line no-unused-vars
  app.put("/api/event/:eventid/:vendorid", function (req, res) {
    newEventVendor = req.params.vendorid;
    selectedEvent = req.params.eventid;
    console.log("NEW EVENT VENDOR IN POST: " + newEventVendor);
    console.log("SELECTED EVENT IN POST: " + selectedEvent);
  
    db.Events.update(
      { vendorid : newEventVendor },
      { where: 
        { eventid: selectedEvent } 
      }
    ).then(function(){
      res.json(true);
    });
  });
};

