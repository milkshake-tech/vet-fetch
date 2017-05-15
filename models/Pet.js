var mongoose = require('mongoose')

var PetSchema = new mongoose.Schema({
	ownerID:{type:String, default: ''},
	name:{type:String, default: ''},
	birthday:{type:String, lowercase: true, default: ''},
	breed:{type:String, trim:true, lowercase: true, default: ''},
	sex:{type:String, trim:true, lowercase: true, default: ''},
	species:{type:String, trim:true, lowercase: true, default: ''},
	weight: {type:String, default: ''},
	medicalAllergies:{type: Array, default: []},
	medication:{type:Array, default: []},
	tags:{type: mongoose.Schema.Types.Mixed, default:{}},
	vaccines:{type: Array, default: []},
	image: {type: mongoose.Schema.Types.Mixed, default:{}},
	timestamp:{type: String, default: Date.now}
})

PetSchema.methods.summary = function(){
	var summary = {
		id: this._id,
		ownerID: this.ownerID,
		name: this.name,
		birthday: this.birthday,
		breed: this.breed,
		sex: this.sex,
		species: this.species,
		weight: this.weight,
		medicalAllergies: this.medicalAllergies,
		medication: this.medications,
		tags: this.tags,
		vaccines: this.vaccines,
		image: this.image
	}

	return summary
}

module.exports = mongoose.model('PetSchema', PetSchema)
