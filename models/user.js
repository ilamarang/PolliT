var bcrypt = require('bcryptjs');
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
  });
  return User;

}


module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	
}
