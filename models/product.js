var mongoose = require('mongoose');

module.exports = mongoose.model('Product',{
	id: String,
	picture: String,
	title: String,
	description: String,
	price: Number,
	type: String,
	option: String
});