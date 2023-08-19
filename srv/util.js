const cds = require("@sap/cds");

const getNextSequenceValue = async (sSequenceName) => {
    let response;
    const tx = cds.tx();
    try {
        const sSelectQuery = `SELECT VALUE FROM my_ecommerce_utils_SEQUENCE WHERE NAME = ?`;
        const [ oSequenceValue ] = await tx.run(sSelectQuery, [sSequenceName]);
        const iSequenceValue = oSequenceValue.VALUE;
        
        switch (sSequenceName) {
            case "USER_ID":
                response = `U${iSequenceValue.toString().padStart(8, "0")}`;
                break;
            case "ROLE_ID":
                response = `U${iSequenceValue.toString().padStart(3, "0")}`;
                break;
            default: throw Error(`Sequence ${sSequenceName} doesn't exists`);
        }
        const sUpdateQuery = `UPDATE my_ecommerce_utils_SEQUENCE SET VALUE = ? WHERE NAME = ?`;
        await tx.run(sUpdateQuery, [parseInt(iSequenceValue) + 1, sSequenceName]);
        await tx.commit();
        return response;
    } catch (err) {
        await tx.rollback(err);
    }
}

module.exports = {
    getNextSequenceValue
}