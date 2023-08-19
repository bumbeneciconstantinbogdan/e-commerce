const cds = require("@sap/cds");
const { hash, compare } = require("bcrypt");
const { sign } = require('jsonwebtoken');
const { getNextSequenceValue } = require('./util')


module.exports = (srv) => {

    srv.before("CREATE", "User", async req => {
        const tx = cds.transaction(req);
        try {
            const USER_ID = await getNextSequenceValue('USER_ID');
            const { EMAIL, PASSWORD } = req.data;

            const [oUserWithEmail] = await tx.run(SELECT.from("my_ecommerce_auth_USER")
                .where({
                    EMAIL: EMAIL,
                }));

            if (oUserWithEmail) {
                throw Error(`User with email ${EMAIL} exists.`);
            }

            await tx.run(INSERT.into("my_ecommerce_PROFILE", [
                {
                    EMAIL,
                    ADDRESS: null,
                    FIRST_NAME: null,
                    LAST_NAME: null,
                    PHONE: null,
                    PICTURE: null
                },
            ]));

            req.data.PASSWORD = await hash(PASSWORD, 10);
            req.data.USER_ID = USER_ID;
        } catch (e) {
            req.reject(405, e);
        }
    });

    srv.on("DELETE", "User", async (req) => {
        const tx = cds.transaction(req);
        try {
            const { USER_ID } = req.data;

            const [user] = await SELECT.from("my_ecommerce_auth_USER")
                .where({ USER_ID });

            if (!user?.EMAIL) {
                throw Error("Resource unavailable.");
            }

            const { EMAIL } = user;

            const aPromises = [
                DELETE.from("my_ecommerce_PROFILE").where({ EMAIL }),
                DELETE.from("my_ecommerce_auth_USER").where({ USER_ID })
            ].map(deltePromise => tx.run(deltePromise));

            await Promise.all(aPromises);
        } catch (e) {
            return req.reject(400, e);
        }
    });

    srv.on("regenerateToken", async (req, res) => {
        try {
            const { sEmail, sPassword } = req.data.credentials || {};
            const sSecret = process.env.SECRET;

            const [oUserWithEmail] = await SELECT
                .from("my_ecommerce_auth_USER")
                .where({
                    EMAIL: sEmail,
                });

            if (!oUserWithEmail) {
                throw Error(`User with email ${sEmail} doesn't exists.`);
            }

            const bPasswordsMatch = await compare(sPassword, oUserWithEmail.PASSWORD);

            if (!bPasswordsMatch) {
                throw Error(`Password is incorrect.`);
            }

            const [oRoleForUser] = await SELECT
                .from("my_ecommerce_auth_ROLE")
                .where({
                    ROLE_ID: oUserWithEmail.ROLE_ID
                });

            const oUser = {
                id: sEmail,
                roles: [oRoleForUser.DESCRIPTION]
            };

            return sign(oUser, sSecret, { expiresIn: 1000 * 60 * 60 });

        } catch (e) {
            req.reject(400, e);
        }
    });
};