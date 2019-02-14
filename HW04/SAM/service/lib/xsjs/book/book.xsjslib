const SqlLib = $.import('xsjs.book', 'genStatement').statementConstructor;
const sqlLib = new SqlLib($.hdb.getConnection({
    treatDateAsUTC: true
}));


var book = function (connection) {
    const AUTHORS_TABLE = "SAM::Author";
    const BOOKS_TABLE = "SAM::ExtraInfo.Books";

    function getNextval(sSeqName) {
        const statement = `select "${sSeqName}".NEXTVAL as "ID" from dummy`;
        const result = connection.executeQuery(statement);

        if (result.length > 0) {
            return result[0].ID;
        } else {
            throw new Error('ID was not generated');
        }
    }

    this.doGet = function () {
        const result = connection.executeQuery(`SELECT * FROM "${BOOKS_TABLE}"`);

        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };


    this.doPost = function (obj) {
        //Get Next ID Number
        obj.bid = getNextval("SAM::bid");

        //generate query
        const statement = sqlLib.createPreparedInsertStatement(BOOKS_TABLE, obj);
        //execute update
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(obj));
    };


    this.doPut = function (obj) {
        //generate query
        const statement = sqlLib.createPreparedUpdateStatement(BOOKS_TABLE, obj); //`UPDATE "${BOOKS_TABLE}" SET "authid"='${obj.authid}', "caption"='${obj.caption}'  WHERE "bid"='${obj.bid}'`;
        $.trace.error("sql to update: " + statement);

        //execute update
        connection.executeUpdate(statement);
        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody('Books updated');
    };


    this.doDelete = function (obj) {

        let statement = `DELETE FROM "${BOOKS_TABLE}" WHERE "bid"='${obj.bid}';`;
        connection.executeUpdate(statement);
        connection.commit();

        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify({}));
    };
};
