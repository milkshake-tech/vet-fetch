var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
	firstName:{type:String, lowercase: true, trim: true, default: ''},
	lastName:{type:String, lowercase: true, trim: true, default: ''},
	email:{type:String, lowercase: true, trim: true, default: ''},
	phone:{type:String, lowercase: true, trim: true, default: ''},
	password:{type: String, default: ''},
	image: {type: String, trim: true, default: ''},
	timestamp:{type: String, default: Date.now}
})

UserSchema.methods.summary = function(){
	var summary = {
		firstName: this.firstName,
		lastName: this.lastName,
		email: this.email,
		phone: this.phone,
		timestamp: this.timestamp,
		image: this.image,
		id: this._id
	}

	return summary
}

module.exports = mongoose.model('UserSchema', UserSchema)
