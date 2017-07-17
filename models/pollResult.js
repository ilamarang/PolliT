module.exports = function(sequelize, DataTypes) {
  var PollResult = sequelize.define("PollResult", {
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
    ,
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    optionSelected: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }

  },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          PollResult.belongsTo(models.Poll, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return PollResult;
};
