var db = require("../models");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy({
  usernameField: "email"
}, function(email, password, done){
  db.User.findOne({
    where: {
      email: email
    }
  }).then(function(caterdb){
    if(caterdb && caterdb.validPassword(password)){
      return done(null, caterdb);  
    }
    //trying vendor now
    db.Vendor.findOne({
      where: {
        email: email
      }
    }).then(function(caterdb){
      if(caterdb && caterdb.validPassword(password)){
      
        return done(null, caterdb);
      }
      return done(null, false, {message: "Incorrect email"});
    });
  });
}));

passport.serializeUser(function(user,cb){
  cb(null, user);
});

passport.deserializeUser(function(obj, cb){
  cb(null, obj);
});



module.exports = passport;