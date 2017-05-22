var superagent = require('superagent')

module.exports = {

	get: function(params, isRaw, completion){
		var endpoint = 'https://api.foursquare.com/v2/venues/explore?client_id='+process.env.FOURSQUARE_client_id+'&client_secret='+process.env.FOURSQUARE_client_secret
		superagent
			.get(endpoint)
			.query({'query': 'Veterinarian'})
			.query({'near': params.zipcode})
			.query({'v': '20170504'})
			.query({'limit': 10})
			.query({'offset': params.offset})
			.end(function(err, res){
				if (err){
					completion(err, null)
					return
				}
				var searchResults = JSON.parse(res.text)

				var searchResultItems = searchResults.response.groups[0].items
				searchResultItems.forEach(function(item, i){
					delete item.reasons
				})
				var vetResults = {offset: params.offset, totalResults: searchResults.response.totalResults, veterinarians: searchResultItems, zipcode: params.zipcode}
				completion(null, vetResults)
				return
			})
	}
}
