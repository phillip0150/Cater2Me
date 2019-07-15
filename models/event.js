module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define("Events", {
    eventid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true,
      },
      userid: {
        type: DataTypes.INTEGER,
        model: 'User',
        key: "userid"
      },
      vendorid: {
        type: DataTypes.INTEGER,
        model: 'Vendor',
        key: "vendorid"
      },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
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
      allowNull: false,
      len: [1]
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    alcohol: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      len: [1]
    },
    decor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      len: [1]
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  

//   Events.associate = function(models) {
//     // We're saying that a Post should belong to an Author
//     // A Post can't be created without an Author due to the foreign key constraint
//     Events.belongsTo(models.User, {
//       foreignKey: {
//         allowNull: false
//       }
//     });
//   };


  return Events;
};
