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
        let sql = `UPDATE "${sTableName}" SET `;

        for(let key in oValueObject){
            if(key!='bid')
            {
                sql += `"${key}"='${oValueObject[key]}', `
            }
        };

        sql = sql.slice(0, -2);
        sql += ` WHERE "bid"='${oValueObject.bid}';`;
        return sql;
    };
};
