const superagent = require('superagent')

module.exports = {
	get: (params, isRaw) => {
		return new Promise((resolve, reject) => {
			const endpoint = 'https://api.foursquare.com/v2/venues/explore?client_id='+process.env.FOURSQUARE_client_id+'&client_secret='+process.env.FOURSQUARE_client_secret
			superagent
				.get(endpoint)
				.query({'query': 'Veterinarian'})
				.query({'near': params.zipcode})
				.query({'v': '20170504'})
				.query({'limit': 10})
				.query({'offset': params.offset})
				.end((err, res) => {
					if (err){
						return reject(err)
					}

					let searchResults = JSON.parse(res.text)

					let searchResultItems = searchResults.response.groups[0].items
					searchResultItems.forEach((item, i) => {
						delete item.reasons
					})

					let vetResults = {offset: params.offset, totalResults: searchResults.response.totalResults, veterinarians: searchResultItems, zipcode: params.zipcode}
					return resolve(vetResults)
				})
		})
	}
}
