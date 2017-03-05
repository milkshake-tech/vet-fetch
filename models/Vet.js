var mongoose = require('mongoose')

var VetSchema = new mongoose.Schema({
	firstName: {type:String, lowercase: true, trim: true, default: ''},
	lastName: {type:String, lowercase: true, trim: true, default: ''},
	practiceName: {type:String, lowercase: true, trim: true, default: ''},
	zipcode:{type:String, lowercase: true, trim: true, default: ''},
	email:{type:String, lowercase: true, trim: true, default: ''},
	password:{type:String, default: ''},
	timestamp:{type: String, default: Date.now}
})

VetSchema.methods.summary = function(){
	var summary = {
		id: this._id,
		firstName: this.firstName,
		lastName: this.lastName,
		practiceName: this.practiceName,
		zipcode: this.zipcode,
		email: this.email
	}

	return summary
}

module.exports = mongoose.model('VetSchema', VetSchema)
