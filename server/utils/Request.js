const superagent = require('superagent')

module.exports = {
	get: function(url, params, completion){
		return new Promise(function (resolve, reject){
			superagent
				.get(url)
				.query(params)
				.set('Accept', 'application/json')
				.end(function(err, res){
					if(err){
						reject(err)
					}
					else {
						resolve(res.body)
					}
				})
		})
	}
}
