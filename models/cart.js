var mongoose = require('mongoose');

module.exports = mongoose.model('Cart',{
	id: String,
	quantity: String,
	productId: String,
	usercartId: String
});