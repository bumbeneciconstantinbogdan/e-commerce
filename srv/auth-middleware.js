const cds = require("@sap/cds");
const { verify } = require('jsonwebtoken');

module.exports =  function auth(req, res, next) {

	const [sBearer, sToken] = (req.headers.authorization || "authType authToken").split(" ");

	if (sBearer !== "Bearer") {
		req.user = new cds.User();
		return next();
	}

	const decodeTokenPromise = new Promise((resolve, reject) => {
		const verifyCallback = (err, data) => err ? reject(err) : resolve(data);
		const sSecret = process.env.SECRET;
		verify(sToken, sSecret, verifyCallback);
	});

	return decodeTokenPromise
		.then(decoded => {
			req.user = new cds.User({ id: decoded.id, roles: decoded.roles });
		})
		.catch(console.error)
		.finally(next);
};
