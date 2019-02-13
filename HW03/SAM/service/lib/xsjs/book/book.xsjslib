var statementConstructor = function () {

    this.createPreparedInsertStatement = function (sTableName, oValueObject) {
        let oResult = {
            aParams: [],
            aValues: [],
            sql: "",
        };
        let sColumnList = '', sValueList = '';

        for(let key in oValueObject){
            sColumnList += `"${key}", `;
            oResult.aParams.push(key);

            sValueList += "?, ";
            oResult.aValues.push(oValueObject[key]);
        };

        // Remove the last unnecessary comma and blank
        sColumnList = sColumnList.slice(0, -2);
        sValueList = sValueList.slice(0, -2);

        oResult.sql = `insert into "${sTableName}" (${sColumnList}) values (${sValueList})`;

        $.trace.error("sql to insert: " + oResult.sql);
        return oResult;
    };

    this.createPreparedUpdateStatement = function (sTableName, oValueObject) {
        let oResult = {
            aValues: [],
            sql: `UPDATE "${sTableName}" SET `
        };

        for(let key in oValueObject){
            oResult.aValues.push(oValueObject[key]);
            oResult.sql += `"${key}"='${oValueObject[key]}', `;
        };

        // Remove the last unnecessary comma and blank
        oResult.sql = oResult.sql.slice(0, -2);
        oResult.sql = ` WHERE "bid"=${oValueObject.bid};`;

        $.trace.error("sql to update: " + oResult.sql);
        return oResult;
    };

};


var book = function (connection) {

    const statementConstructorLib = new statementConstructor();
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
        oUser.usid = getNextval("SAM::bid");

        //generate query
        const statement = statementConstructorLib.createPreparedInsertStatement(BOOKS_TABLE, obj);
        //execute update
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(obj));
    };


    this.doPut = function (obj) {
        //generate query
        const statement = statementConstructorLib.createPreparedUpdateStatement(BOOKS_TABLE, obj);

        //execute update
        connection.executeUpdate(statement.sql, statement.aValues);
        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody('Books updated');
    };


    this.doDelete = function (obj) {

        let statement = `DELETE FROM "${AUTHORS_TABLE}" WHERE "bid"=${obj.bid};`;
        $.trace.error("sql to delete: " + statement);
        connection.executeUpdate(statement);

        statement = `DELETE FROM "${BOOKS_TABLE}" WHERE "bid"=${obj.bid};`;
        connection.executeUpdate(statement);

        connection.commit();

        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify({}));
    };
};
