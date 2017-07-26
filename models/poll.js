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
}); /*,
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
  );*/

  Poll.associate = function(models) {
    // We're saying that a Poll should belong to an User
    // A Poll can't be created without an User due to the foreign key constraint
    Poll.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    // Associating PollResult with Poll
    // When an Poll is deleted, also delete any associated PollResult
    Poll.hasMany(models.PollResult, {
      onDelete: "cascade"
    });
  };

  return Poll;
};
