const User = require('./User')
const bcrypt = require('bcryptjs')

module.exports = {
	get: (params, isRaw) => {
		return new Promise((resolve, reject) => {
			User.find(params, (err, users) => {
				if(err){
					reject(err)
					return
				}

				if(isRaw === true){
					resolve(users)
				}

				let summaries = []
				for(let i=0; i<users.length; i++){
					let user = users[i]
					summaries.push(user.summary())
				}
				resolve(summaries)
			})
		})
	},

	getById: function(id, isRaw, callback){
		User.findById(id, function(err, user){
			if(err){
				if(callback !== null)
					callback({message: 'User Not Found'}, null)
				return
			}

			if (callback !== null){
				if(isRaw === true){
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
