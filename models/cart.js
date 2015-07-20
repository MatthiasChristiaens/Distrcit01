var mongoose = require('mongoose');

module.exports = mongoose.model('Cart',{
	id: String,
	title: String,
	quantity: String,
	price: String,
	option: String,
	total: String,
	productId: String,
	usercartId: String,
	status: {type: String, default: "true"}
});