var mongoose = require('mongoose');

module.exports = mongoose.model('Orders',{
	id: String,
	order: {type: String, default: ""},
	status: {type: String, default: "Wachten op verzending"},
	userorder: String
});