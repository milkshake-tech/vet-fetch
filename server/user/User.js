const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	email:{type:String, lowercase: true, trim: true, default: ''},
	phone:{type:String, lowercase: true, trim: true, default: ''},
	password:{type: String, default: ''},
	image: {type: String, trim: true, default: ''},
	timestamp:{type: String, default: Date.now}
})

UserSchema.methods.summary = function(){
	const summary = {
		email: this.email,
		phone: this.phone,
		timestamp: this.timestamp,
		image: this.image,
		id: this._id
	}

	return summary
}

module.exports = mongoose.model('UserSchema', UserSchema)
