//SET UP THE APPLICATION

//import express
const express = require('express');
const app = express(); //execute express
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//import all routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');
const userRoutes = require('./api/routes/user');

//connect the mongoose
mongoose.connect('mongodb://progif-api:progif-api@progif-api-shard-00-00-2ezsg.mongodb.net:27017,progif-api-shard-00-01-2ezsg.mongodb.net:27017,progif-api-shard-00-02-2ezsg.mongodb.net:27017/test?ssl=true&replicaSet=progif-api-shard-0&authSource=admin&retryWrites=true',{
	useNewUrlParser: true
});
mongoose.Promise = global.Promise;

//using morgan
app.use(morgan('dev')); //dev is the format use for the ouput 
//apply body parser
app.use(bodyParser.urlencoded({extended: false}));	//simple URL encoded data, if true will allow rich text data format
app.use(bodyParser.json());	//extract to json data

//CORS header to prevent CORS errors
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");	//allow access to any origin
	res.header(
		"Access-Control-Allow-Headers", 
		"Origin, X-ReuestedWith, Content-Type, Accept, Authorization"
	);

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

//method sets up middleware
app.use('/products', productRoutes);
app.use('/order', orderRoutes);
app.use('/user', userRoutes);

//error handling
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});	
});

module.exports = app;