// DATABASE CONNECTION
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
mongoose.connect('mongodb://localhost/park');

var Lot = require('../server/models/lots');
var lot = new Lot({
        name : 'Test Lot 2',
        description : 'Test Lot 2 Description',
        lat : 29.6254423,
        lng : -82.4373587,
        spaces : 10,
        buffer : 2
});
lot.save(function(err) {
	if (!err) {
		console.log(lot);
		process.exit(0);
	} else {
		process.exit(1);
	}
});
