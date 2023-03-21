const cds = require("@sap/cds");
const { hash } = require("bcrypt");

module.exports = (srv) => {
	srv.before("CREATE", "User", async (req) => {
		try {
			const { EMAIL, PASSWORD } = req.data;

			const [oUserWithEmail] = await SELECT.from("my_ecommerce_USER").where({
				EMAIL,
			});

			if (oUserWithEmail) {
				throw Error(`User with email ${EMAIL} exists.`);
			}

			req.data.PASSWORD = await hash(PASSWORD, 10);
		} catch (e) {
			req.reject(405, e);
		}
	});
};
