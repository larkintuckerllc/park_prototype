var mongoose = require('mongoose');
var idValidator = require('mongoose-id-validator');
var Schema = mongoose.Schema;
var reservationSchema = new Schema({
	lot: {
		type: Schema.Types.ObjectId,
		ref: 'Lot',
		required: true
	},
	start: {
		type: Number,
		required: true
	},
	end: {
		type: Number,
		required: true
	}
});
reservationSchema.plugin(idValidator);
var Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
