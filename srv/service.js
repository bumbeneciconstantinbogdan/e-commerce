const cds = require("@sap/cds");
const { hash, compare } = require("bcrypt");

module.exports = (srv) => {
  const encodeBase64 = (data) => {
    return Buffer.from(data).toString("base64");
  };

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

      await INSERT.into("my_ecommerce_PROFILE", [
        {
          EMAIL,
          ADDRESS: null,
          FIRST_NAME: null,
          LAST_NAME: null,
          PHONE: null,
          PICTURE:
            "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
        },
      ]);

      req.data.PASSWORD = await hash(PASSWORD, 10);
    } catch (e) {
      req.reject(405, e);
    }
  });

  srv.on("DELETE", "User", async (req) => {
    try {
      const { USER_ID } = req.data;

      const [user] = await SELECT.from("my_ecommerce_USER").where({ USER_ID });

      if (!user?.EMAIL) {
        throw Error("Resource unavailable.");
      }

      const { EMAIL } = user;

      await DELETE.from("my_ecommerce_PROFILE").where({ EMAIL });
      await DELETE.from("my_ecommerce_USER").where({ USER_ID });
    } catch (e) {
      return req.reject(400, e);
    }
  });

  srv.on("login", async (req) => {
    try {
      const { EMAIL, PASSWORD } = req.data;

      const [oUserWithEmail] = await SELECT.from("my_ecommerce_USER").where({
        EMAIL,
      });

      if (!oUserWithEmail) {
        throw Error(`User with email ${EMAIL} doesn't exists.`);
      }

      const bPasswordsMatch = await compare(PASSWORD, oUserWithEmail.PASSWORD);

      if (!bPasswordsMatch) {
        throw Error(`Password is incorrect.`);
      }

      return "Basic " + encodeBase64(`${EMAIL}:${PASSWORD}`);
    } catch (e) {
      req.reject(400, e);
    }
  });
};
