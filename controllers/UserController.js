var User = require('../models/User')
var bcrypt = require('bcryptjs')

module.exports = {
	get: function(params, isRaw, callback){
		User.find(params, function(err, users){
			if(err){
				if(callback != null)
					return callback(err, null)
			}

			if (users === null){
				return callback(err, null)
			}

			if(callback !== null){
				if(isRaw === true){
					return callback(null, users)
				}

				var summaries = []
				for (var i=0; i<users.length; i++){
					var user = users[i]
					summaries.push(user.summary())
				}
				callback(null, summaries)
			}
		})
	},

	getById: function(id, isRaw, callback){
		User.findById(id, function(err, user){
			if(err){
				if(callback !== null)
					callback({message: 'User Not Found'}, null)
				return
			}

			if (callback != null){
				if(isRaw == true){
					callback(null, user)
					return
				}
				callback(null, user.summary())
			}
		})
	},

	post: function(params, callback){
		var password = params['password'] // plain text password
		var hashedPassword = bcrypt.hashSync(password, 10)
		params['password'] = hashedPassword

		User.create(params, function(err, user){
			if(err){
				if(callback != null)
					callback(err, null)
				return
			}

			if(callback != null)
				callback(null, user.summary())
		})
	},

	put: function(id, params, callback){
		User.findByIdAndUpdate(id, params, {new: true}, function(err, user){
			if(err){
				if (callback != null)
					callback(err, null)
				return
			}

			if (user == null){
				callback(err, null)
				return
			}

			if (callback != null)
				callback(null, user.summary())
		})
	}
}
