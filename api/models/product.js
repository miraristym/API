//import mongoose
const mongoose = require('mongoose');

//define the schema
const productSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {type: String, required: true},
	price: {type: Number, required: true}
});

//export this model
module.exports = mongoose.model('Product', productSchema);