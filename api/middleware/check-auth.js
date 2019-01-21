const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
// 	try{
// 		const token = req.body.token;
// 		const decoded = jwt.verify(token, "secret");
// 		req.userData = decoded;
// 		next();
// 	} catch (error) {
// 		return res.status(401).json({
// 			message: 'Auth failed!'
// 		});
// 	}

// 	next();
// };

module.exports = (req, res, next) => {
	try{
		const token = req.headers.authorization.split(" ")[1];	
		const decoded = jwt.verify(token, "secret");
		// const decoded = jwt.verify(req.body.token, "secret");
		req.userData = decoded;
		if (req.userData) {
			return next();
		}else{
			return res.status(401).json({
				message: 'Auth failed!'
			});
		}
	}catch (error) {
		return res.status(401).json({
			message: 'Auth failed!'
		});
	}
}