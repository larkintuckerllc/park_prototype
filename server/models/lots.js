var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var lotSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	lat: {
		type: Number,
		required: true
	},
	lng: {
		type: Number,
		required: true
	},
	spaces: {
		type: Number,
		required: true
	},
	buffer: {
		type: Number,
		required: true
	}
});
var Lot = mongoose.model('Lot', lotSchema);
module.exports = Lot;
