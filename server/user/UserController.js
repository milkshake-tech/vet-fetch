const User = require('./User')
const bcrypt = require('bcryptjs')

module.exports = {
	get: (params, isRaw) => {
		return new Promise((resolve, reject) => {
			User.find(params, (err, users) => {
				if(err){
					return reject(err)
				}

				if(isRaw === true){
					return resolve(users)
				}

				let summaries = []
				for(let i=0; i<users.length; i++){
					let user = users[i]
					summaries.push(user.summary())
				}
				return resolve(summaries)
			})
		})
	},

	getById: (id, isRaw) => {
		return new Promise((resolve, reject) => {
			User.findById(id, (err, user) => {
				if(err){
					return reject({message: 'User not found'})
				}

				if(user === null){
					return resolve(null)
				}

				if(isRaw === true){
					return resolve(user)
				}

				return resolve(user.summary())
			})
		})
	},

	post: function(params, callback){
		let newUser = Object.assign({}, params)
		var password = newUser['password'] // plain text password
		var hashedPassword = bcrypt.hashSync(password, 10)
		newUser['password'] = hashedPassword

		User.create(newUser, function(err, user){
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
