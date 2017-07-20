module.exports = function(sequelize, DataTypes) {
  var PollType = sequelize.define("PollType", {
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }

  },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
          PollType.hasMany(models.Poll, {
            onDelete: "cascade"
          });
        }
      }
    }

  );
  return PollType;
};
