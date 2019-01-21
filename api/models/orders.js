//import mongoose
const mongoose = require('mongoose');

//define the schema
const orderSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
	quantity: {type: Number, default: 1}
});

//export this model
module.exports = mongoose.model('Orders', orderSchema);