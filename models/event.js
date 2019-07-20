module.exports = function (sequelize, DataTypes) {
  var Events = sequelize.define("Events", {
    eventid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      model: "User",
      key: "userid"
    },
    vendorid: {
      type: DataTypes.INTEGER,
      model: "Vendor",
      key: "vendorid",
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [12],
          msg: "Needs to be 10 digits with dashes"
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    occasion: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    courses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    consideration: {
      type: DataTypes.STRING,
      allowNull: true,
      len: [1]
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    alcohol: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    decor: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    time: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    customerAccept: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  });
  Events.addHook("beforeCreate", function(event){
    event.city = event.city.charAt(0).toUpperCase() + event.city.slice(1);
  });
  return Events;
};
