'use strict'

const connection = require('../config/database');
const response = require('../libs/response');


exports.getCount = function (callback) {
    connection.query('SELECT COUNT(*) as count FROM data_note', function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result[0].count);
    });

};
exports.getCountQuery = function (req, res, callback) {
    const searchBy = req.query.search_by;
    const search = req.query.search;
    const id = req.query.id;
    const orderBy = req.query.order_by;
    const sort = req.query.sort_by;
    let select = req.query.select;

    let select_mode = (select) ? select : ',';
    select = select_mode.split(",");

    let sql = "";

    let loop = [];
    for (let i = 0; i < select.length; i++) {
        let val = select[i];
        switch (val) {
            case 'time':
                loop.push("data_note.time");
                break;
            case 'id':
                loop.push("data_note.id");
                break;
            case 'title':
                loop.push("data_note.title");
                break;
            case 'note':
                loop.push("data_note.title");
                break;
            case 'category':
                loop.push('category_note.name as category');
                break;
        }
    }

    sql = loop.length > 0 ? sql.concat(`SELECT ${loop.join()} `) : sql.concat(`SELECT data_note.id, data_note.title, data_note.note, data_note.time, category_note.name as name_category `);
    sql = sql.concat(`FROM data_note LEFT JOIN category_note ON data_note.id_category=category_note.id `);
    sql = (search || (search && searchBy) || id) ? sql.concat(`WHERE `) : sql;
    sql = (search) ? sql.concat(`data_note.${searchBy || 'title'} LIKE '%${search}%' `) : sql;
    sql = (search && id) ? sql.concat(`AND `) : sql;
    sql = (id) ? sql.concat(`data_note.id = '${id}' `) : sql;
    sql = sql.concat(`ORDER BY data_note.${orderBy || 'time'} ${sort || 'DESC'} `);

    connection.query(sql, function (err, result) {

        if (err)
            response.errorWithCode(404,"Note does not found", res);
        else
            callback(sql, result.length);
    });
};

