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
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    optionSelected: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0]
      }
    }

  });/*,
    {
      classMethods: {
        associate: function(models) {

          PollResult.belongsTo(models.Poll, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  PollResult.removeAttribute('id');*/
  
  PollResult.associate = function(models) {
    // We're saying that a PollResult should belong to a Poll
    // A PollResult can't be created without a Poll due to the foreign key constraint
    PollResult.belongsTo(models.Poll, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return PollResult;
};
