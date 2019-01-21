//import library
const mongoose = require('mongoose');

//import models
const Product = require('../models/product');

//Handle incoming GET request
exports.products_get_all = (req, res, next) => {
	Product.find()
	.select('name price _id')
	.exec()
	.then(docs => {
		//give some information to client (metatdata)
		const response = {
			count: docs.length,
			//the metadata
			products: docs.map(doc => {
				return {
					name: doc.name,
					price: doc.price,
					_id: doc._id,
					request: {
						type: 'GET',
						url: 'http://localhost:3000/products/' + doc._id
					}
				}
			})
		};
		res.status(200).json(response);
	})
	.catch( err => {
		console.log(500).json({
			error: err
		});
	});
};

exports.products_get_product = (req, res, next) => {
	const id = req.params.productId;	//extract the product Id
	Product.findById(id)
	.select('name price _id')
	.exec()
	.then(doc => {
		console.log("From database", doc);
		if (doc) {
			res.status(200).json({
				product: doc,
				request: {
					type: 'GET',
					url: 'http://localhost:3000/products'
				}
			});	
		} else {
			res.status(404).json({
				message: 'No valid entry found'
			});
		}		
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	});
};

//Handle incoming POST request
exports.products_create_product = (req, res, next) => {
	//create the product
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price
	});
	product
	.save()	//save the product to the database
	.then(result => {
		console.log(result);
		res.status(201).json({
			message: 'Created product succesfully',
			createProduct: {
				name: result.name,
				price: result.price,
				_id: result._id,
				request: {
					type: 'GET',
					url: "http://localhost:3000/products/" + result._id
				}
			}
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
};

//Handle incoming UPDATE request
exports.products_update_product = (req, res, next) => {
	const id = req.params.productId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Product.update({_id: id}, {$set: updateOps})
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'Product updated',
			request: {
				type: 'GET',
				url: 'http://localhost:3000/products/' + id
			}
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
};

//Handle incoming DELETE request
exports.products_del_product = (req, res, next) => {
	const id = req.params.productId;
	Product.remove({_id: id})
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'Product succesfully deleted!',
			request: {
				type: 'POST',
				url: 'http://localhost:3000/products',
				body: {name: 'String', price: 'Number'}
			}
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
};