'use strict'

const response = require('./response');
const connection = require('./connect');
const modelNotes = require('./modelNotes');

const dateFormat = require('dateformat');

//Controler Note
exports.home = function (req, res) {
    response.success('Welcome to Server Sample Note App API', res);
};
exports.insertNote = function (req, res) {
    let note = req.body.note;
    let id_category = req.body.id_category;
    let title = req.body.title;
    let time = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

    if (typeof note == 'undefined' || typeof id_category == 'undefined' || typeof title == 'undefined') {
        response.success("Field note or id_category cannot null or empty", res);
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
                    response.success(data, res)
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
            if (error) response.success("Update Note didn't work", res);
            (result.affectedRows == 0) ? response.success("Update Note didn't work", res) : response.success("Note has been update!", res);
        }
    )
};
exports.deleteNote = function (req, res) {

    connection.query(`delete from data_note where id =?`, [req.params.id],
        function (error, result, fields) {
            if (error) throw error;
            (result.affectedRows == 0) ? response.success("id not found!", res) : response.success("Note has been deleted!", res);
        }
    )
};
exports.note = function (req, res) {
    modelNotes.getCount(function (result) {
        modelNotes.getCountQuery(req, function (sql, maxCount) {
            connection.query(sql, function (error, rows, field) {

                let page = req.query.page || 1;
                let limit = req.query.limit;
                const def_limit = 5;

                let end = page * (limit || def_limit);

                let start = end - (limit || def_limit);

                let amount_page = Math.ceil((rows.length || 1) / (limit || def_limit));

                let next_page = (page * limit < maxCount) ? Number(page) + 1 : Number(page);

                sql = sql.concat(`LIMIT ${start}, ${end}`);

                connection.query(sql, function (error, rows, field) {
                    if (error) {
                        response.success("Note does not found", res);
                    } else {
                        const data = {
                            status: 200,
                            amounts_note: maxCount,
                            amounts_page: amount_page,
                            current_page: page,
                            next_page: next_page,
                            limit: limit,
                            values: rows,
                        };

                        (rows.length > 0) ? response.notes(data, res) : response.errorWithCode(400, 'Note does not found', res);
                    }
                });
            })
        });

    });
};
