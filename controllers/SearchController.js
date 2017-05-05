var superagent = require('superagent')

module.exports = {
	get: function(params, completion){
		var endpoint = 'https://api.foursquare.com/v2/venues/explore'
		superagent
			.get(endpoint)
			//move to process.env
			.query({'client_id': 'VJV0BPLN2TZKDM0EIYSHINPGTPJLKRETL02511U3NIM0WCPL'})
			.query({'client_secret': 'DK23NGVZIYIDN5TGI0TGKDZDTDWD403WKZIFT24AEN0MC02E'})
			.query({'query': 'Veterinarian'})
			.query({'near': params.zipcode})
			.query({'v': '20170504'})
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
				var vetResults = {totalResults: searchResults.response.totalResults, veterinarians: searchResultItems, zipcode: params.zipcode}
				completion(null, vetResults)
				return
			})
	}
}
