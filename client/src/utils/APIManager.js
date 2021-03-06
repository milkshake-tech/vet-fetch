import superagent from 'superagent'

export default {

	handleGet: (endpoint, params, completion) => {
		superagent
		.get(endpoint)
		.auth('vetfetch', 'milkshake')
		.query(params)
		.set('Accept', 'application/json')
		.end(function(err, res){
			if(err){
				if (completion !== null)
					completion(err, null)
				return
			}

			if (completion !== null){
				completion(null, res.body)
				return
			}
		})
	},

	handleGetById: (endpoint, params, completion) => {
		superagent
		.get(endpoint)
		.auth('vetfetch', 'milkshake')
		.query(params)
		.set('Accept', 'application/json')
		.end(function(err, res){
			if(err){
				if (completion !== null)
					completion(err, null)
				return
			}

			if (completion !== null){
				completion(null, res.body)
				return
			}
		})
	},

	handlePost: (endpoint, body, completion) => {
		superagent
		.post(endpoint)
		.auth('vetfetch', 'milkshake')
		.send(body)
		.set('Accept', 'application/json')
		.end((err, res) => {
			if (err){
				return completion(err, null)
			}

    	return completion(null, res.body)
		})
	},

	handlePut: (endpoint, body, completion) => {
		superagent
		.put(endpoint)
		.auth('vetfetch', 'milkshake')
		.send(body)
		.set('Accept', 'application/json')
		.end(function(err, res){
			if (err){
				if (completion !== null)
					completion(err, null)
				return
			}

			if (completion !== null){
				if (res.body.confirmation === 'Success'){
		    		completion(null, res.body)
				}
				else {
		    		completion(err, null)
				}
			}
		})
	}
}
