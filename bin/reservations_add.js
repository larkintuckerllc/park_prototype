// DATABASE CONNECTION
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
mongoose.connect('mongodb://localhost/park');

var Lot = require('../server/models/lots');
var Reservation = require('../server/models/reservations');
var reservation = new Reservation({
        lot: '54cbb81cb07fcb4c1370084b',
        start : 1422652456000,
        end : 1422656056000
});
reservation.save(function(err) {
	if (!err) {
		console.log(reservation);
		process.exit(0);
	} else {
		process.exit(1);
	}
});
