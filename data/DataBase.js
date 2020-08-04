const mysql = require('mysql2/promise');
const config = require('config');

withoutAurguments = async (query) => {
    const conn = await mysql.createConnection({
        host: config.get('DataBase.dbHost'),
        user: config.get('DataBase.dbUser'),
        password: config.get('DataBase.dbPassword'),
        database: config.get('DataBase.dbNameDataBase')
    });
    console.log(query);
    let [rows, fields] = await conn.execute(query, ['1']);
    return rows;
}

withOneAurguments = async (param, query) => {
    const conn = await mysql.createConnection({
        host: config.get('DataBase.dbHost'),
        user: config.get('DataBase.dbUser'),
        password: config.get('DataBase.dbPassword'),
        database: config.get('DataBase.dbNameDataBase')
    });
    console.log(param + ' ' + query);
    let [rows, fields] = await conn.execute(query, [param]);
    return rows;
}

withTwoAurguments = async (param1, param2, query) => {
    const conn = await mysql.createConnection({
        host: config.get('DataBase.dbHost'),
        user: config.get('DataBase.dbUser'),
        password: config.get('DataBase.dbPassword'),
        database: config.get('DataBase.dbNameDataBase')
    });
    console.log(param1 + ' ' + param2 + ' ' + query);
    let [rows, fields] = await conn.execute(query, [param1, param2]);
    return rows;
}

module.exports = {withoutAurguments, withOneAurguments, withTwoAurguments};