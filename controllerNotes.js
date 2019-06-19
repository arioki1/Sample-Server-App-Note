'use strict'

const response = require('./response');
const connection = require('./connect');
const dateFormat = require('dateformat');

/*function getCountNote(callback)
{
    connection.query('SELECT COUNT(*) as total FROM data_note', function(err, result)
    {
        if (err)
            callback(err,null);
        else
            callback(null,result[0].total);

    });

}*/
//Controler Note
exports.home = function (req, res) {
    response.ok('Welcome to Server Sample Note App API', res);
};
exports.listNote = function (req, res) {
    const sql = `SELECT data_note.id, data_note.title, data_note.note, 
                data_note.time, category_note.name as "name_category" 
                FROM data_note LEFT JOIN category_note 
                ON data_note.id_category=category_note.id`;
    connection.query(sql, function (error, rows, field) {
        if (error) {
            throw error;
        } else {
            response.ok(rows, res);
        }
    });
};
exports.insertNote = function (req, res) {
    let note = req.body.note;
    let id_category = req.body.id_category;
    let title = req.body.title;
    let time = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

    if (typeof note == 'undefined' || typeof id_category == 'undefined' || typeof title == 'undefined') {
        response.ok("Field note or id_category cannot null or empty", res);
    } else {
        connection.query(`INSERT INTO data_note set title=?, note=?, time=?, id_category=?;`, [title, note, time, id_category],
            function (error, rows, field) {
                if (error) {
                    throw error
                    response.error(res)
                } else {
                    let data = {
                        error: false,
                        data: rows,
                        message: 'New data has been created',
                    }
                    response.ok(data, res)
                }
            })
    }
};
exports.updateNote = function (req, res) {
    let id = req.params.id;
    let id_category = req.body.id_category;
    let note = req.body.note;
    let title = req.body.title;
    let sql = `UPDATE data_note SET `;
    sql = (title) ? sql.concat(`title="${title}" `) : sql;
    sql = (note && title) ? sql.concat(`, `) : sql;
    sql = (note) ? sql.concat(`note="${note}" `) : sql;
    sql = (note && id_category) ? sql.concat(`, `) : sql;
    sql = (id_category) ? sql.concat(`id_category="${id_category}" `) : sql;
    sql = sql.concat(`WHERE id="${id}" `);
    connection.query(sql,
            function (error, result, field) {
                if (error) response.ok("Update Note didn't work", res);
                (result.affectedRows == 0) ? response.ok("Update Note didn't work", res) : response.ok("Note has been update!", res);
            }
        )
};
exports.deleteNote = function (req, res) {

    connection.query(`delete from data_note where id =?`, [req.params.id],
        function (error, result, fields) {
            if (error) throw error;
            (result.affectedRows == 0) ? response.ok("id not found!", res) : response.ok("Note has been deleted!", res);
        }
    )
};
exports.note = function (req, res) {
    const searchBy = req.query.search_by;
    const search = req.query.search;
    const id = req.query.id;
    const orderBy = req.query.order_by;
    const sort = req.query.sort;

    const page = req.query.page;
    const limit = req.query.limit || 5;
    let end = page * limit;
    let start = end - limit;

    let sql = `SELECT data_note.id, data_note.title, data_note.note, 
                data_note.time, category_note.name as "name_category" 
                FROM data_note LEFT JOIN category_note 
                ON data_note.id_category=category_note.id `;

    sql = (search || (search && searchBy) || id) ? sql.concat(`WHERE `) : sql;
    sql = (search) ? sql.concat(`data_note.${searchBy ? searchBy : 'title'} LIKE '%${search}%' `) : sql;
    sql = (search && id) ? sql.concat(`AND `) : sql;
    sql = (id) ? sql.concat(`data_note.id = '${id}' `) : sql;
    sql = (orderBy) ? sql.concat(`ORDER BY data_note.${orderBy ? orderBy : 'title'} `) : sql;
    sql = (sort && orderBy) ? sql.concat(`${sort} `) : sql;
    sql = (page) ? sql.concat(`LIMIT ${start}, ${end}`) : sql;

    connection.query(sql, function (error, rows, field) {
        if (error) {
            response.ok("Note does not found", res);
        } else {
            (rows.length > 0) ? response.ok(rows, res) : response.ok("Note does not found", res);
        }
    });
};
