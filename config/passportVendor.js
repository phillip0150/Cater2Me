var db = require("../models");
var passportVendor = require("passport");
var LocalStrategyVendor = require("passport-local").Strategy;

passportVendor.use(new LocalStrategyVendor({
  usernameField: "email"
}, function(email, password, done){
  db.Vendor.findOne({
    where: {
      email: email
    }
  }).then(function(caterdb){
    if(!caterdb){
      return done(null, false, {message: "Incorrect email"});
    }else if(!caterdb.validPassword(password)){
      return done(null, false, {message: "Incorrect password"});
    }
    return done(null, caterdb);
  });
}));

passportVendor.serializeUser(function(user,cb){
  cb(null, user);
});

passportVendor.deserializeUser(function(obj, cb){
  cb(null, obj);
});

module.exports = passportVendor;