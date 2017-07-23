module.exports = function(sequelize, DataTypes) {
  var Poll = sequelize.define("Poll", {
    title: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    }
    ,
    options: {
      type: DataTypes.TEXT
    }
  ,
  uuid: {
    type: DataTypes.TEXT
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
},
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          Poll.belongsTo(models.User, {
            foreignKey: {
                allowNull: true
            }
          });
        },
        associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
          Poll.hasMany(models.PollResult, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return Poll;
};
