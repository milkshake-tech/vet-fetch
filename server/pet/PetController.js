const Pet = require('./Pet')

module.exports = {

	get: (params, isRaw) => {
		return new Promise((resolve, reject) => {
			Pet.find(params, (err, pets) => {
				if(err){
					return reject(err)
				}

				if(isRaw === true){
					return resolve(pets)
				}

				let summaries = []
				for (let i=0; i<pets.length; i++){
					let pet = pets[i]
					summaries.push(pet.summary())
				}
				return resolve(summaries)
			})
		})
	},

	getById: (id, isRaw) => {
		return new Promise((resolve, reject) => {
			Pet.findById(id, function(err, pet){
				if(err){
					return reject({message: 'Pet not found'})
				}

				if(isRaw === true){
					return resolve(pet)
				}

				return resolve(pet.summary())
			})
		})
	},

	post: function(params, callback){
		var petProfile = params
		if (params['dog'] === true){
			petProfile['species'] = 'dog'
		}
		if (params['cat'] === true){
			petProfile['species'] = 'cat'
		}

		Pet.create(params, function(err, pet){
			if(err){
				if (callback != null)
					callback(err, null)
				return
			}
			if(callback != null)
				callback(null, pet.summary())
		})
	},

	put: function(id, params, callback){
		Pet.findByIdAndUpdate(id, params, {new: true}, function(err, pet){
			if(err){
				if (callback !== null)
					callback(err, null)
				return
			}

			if (pet === null){
				callback(err, null)
				return
			}

			if (callback !== null)
				callback(null, pet.summary())
			return
		})
	}
}
