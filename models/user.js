module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('User',{
  	username: {
  		type: DataTypes.STRING
  	},
  	password: {
  		type: DataTypes.STRING
  	},
  	email: {
  		type: DataTypes.STRING
  	},
  	name: {
  		type: DataTypes.STRING
  	}
  },
  {
    // We're saying that we want our Author to have Posts
    classMethods: {
      associate: function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        User.hasMany(models.Poll, {
          onDelete: "cascade"
        });
      }
    }
  }
);
  return User;

}
