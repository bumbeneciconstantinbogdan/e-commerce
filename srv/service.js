const cds = require("@sap/cds");
const { hash, compare } = require("bcrypt");

module.exports = (srv) => {

	const encodeBase64 = (data) => {
		return Buffer.from(data).toString('base64');
	}
	
	// const decodeBase64 = (data) => {
	// 	return Buffer.from(data, 'base64').toString('ascii');
	// }

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

	srv.on("login", async req => {
		try{
			const { EMAIL, PASSWORD } = req.data;

			const [ oUserWithEmail ] = await SELECT.from("my_ecommerce_USER").where({
				EMAIL,
			});

			if (!oUserWithEmail) {
				throw Error(`User with email ${EMAIL} doesn't exists.`);
			}

			const bPasswordsMatch = await compare(PASSWORD, oUserWithEmail.PASSWORD);

			if(!bPasswordsMatch){
				throw Error(`Password is incorrect.`);
			}

			return  "Basic " + encodeBase64(`${EMAIL}:${PASSWORD}`)
		}catch(e){
			req.reject(400, e)
		}
	})
};
