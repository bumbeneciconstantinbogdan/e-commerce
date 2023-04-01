const cds = require("@sap/cds");
const basicAuth = require("basic-auth");
const { compare } = require("bcrypt");

module.exports = async function auth(req, res, next) {
	const oBasicAuthUser = basicAuth(req);

	try {
		if (!oBasicAuthUser || !oBasicAuthUser.name || !oBasicAuthUser.pass) {
			throw Error("(BASIC) Authorization is required");
		}

		const [oUser] = await SELECT.from("my_ecommerce_USER").where({
			EMAIL: oBasicAuthUser.name,
		});

		if (!oUser) {
			throw Error(`Account with email ${oBasicAuthUser.name} doesn\'t exists.`);
		}

		const bPasswordsMatch = await compare(oBasicAuthUser.pass, oUser.PASSWORD);

		if (!bPasswordsMatch) {
			throw Error("Passwords doesn't match.");
		}

		const [oRole] = await SELECT.from("my_ecommerce_ROLE").where({
			ROLE_ID: oUser.ROLE_ID,
		});

		req.user = new cds.User({
			id: oBasicAuthUser.name,
			roles: [oRole.DESCRIPTION],
		});

		return next();
	} catch (e) {
		//FOR ACCOUNT CREATION - BYPASS AUTHORIZATION
		if (req.method === "POST" && ( req.originalUrl === "/ecommerce/User"  || req.originalUrl === "/ecommerce/login")) {
			req.user = new cds.User();
			return next();
		}


		return res.status(401).json({
			error: {
				status: 401,
				message: "Unauthorized",
				reason: e.message,
			},
		});
	}
};
