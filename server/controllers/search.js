var Lot = require('../models/lots');
var Reservation = require('../models/reservations');
var intRegex = /^\d+$/;
var decimalRegex = /^-*\d+\.?\d*|-*\.\d+/;

// JAVASCRIPT IMPLEMENTATION OF HAVERSINE FORMULA
function deg2rad(deg) {
	return deg * (Math.PI/180)
}
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2)
	; 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	return d;
}

exports.findAll = function(req, res) {

	// ASSUMES NORTH AMERICA AS QUICK QUERY BY LAT AND LNG 
	var DIA = 2;
	var lat = req.query.lat;
	var lng = req.query.lng;
	var start = req.query.start;
	var end = req.query.end;
	if (lat && lng && start && end &&
	decimalRegex.test(lat) &&
	decimalRegex.test(lng) &&
	intRegex.test(start) &&
	intRegex.test(end) &&
	parseInt(start) < parseInt(end)) { 
		lat = parseFloat(lat);
		lng = parseFloat(lng);
		Lot.find({}).
			where('lat').gt(lat - 0.5).lt(lat + 0.5).
			where('lng').gt(lng - 0.5).lt(lng + 0.5).
			exec(function(err, roughLots) {
				if (!err) {	
					var lots = [];
					for (var i = 0; i < roughLots.length; i++) {
						if (getDistanceFromLatLonInKm(lat,lng,parseFloat(roughLots[i].lat),parseFloat(roughLots[i].lng)) < DIA) {
							lots.push(roughLots[i]);
						}
					};
					if (lots.length) {
						var results = [];
						var error = false;
						for (i = 0; i < lots.length; i++) {
							(function(i) {

// RESET INDENT
Reservation.find({}).
	where('lot').equals(lots[i]._id).
	where('start').lt(end).
	where('end').gt(start).
	exec(function(err, reservations) {
		if (!error) {
			if (!err) {
				results.push({
					_id: lots[i]._id,
					name: lots[i].name,
					description: lots[i].description,
					lat: lots[i].lat,
					lng: lots[i].lng,
					available: lots[i].spaces - lots[i].buffer - reservations.length
				});
				if (results.length == lots.length) {
					res.send(results);
				}
			} else {
				error = true;
				res.statusCode = 500;
				res.send('');
			}
		}
	});
// END RESET INDENT

							}(i));
						}	
					} else {
						res.send([]);
					}
				} else {
					console.log(err);
					res.statusCode = 500;
					res.send('');
				}	
			});		
	} else {
		res.statusCode = 400;
		res.send('');
	}
};
