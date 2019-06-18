'use strict';

const response = require('./response');
const connection = require('./connect');
const dateFormat = require('dateformat');

exports.home = function (req, res) {
    response.ok('Welcome to Server Sample Note App API', res);
};

exports.list_note = function (req, res) {
    connection.query(`select * from data_note`, function (error, rows, field) {
        if (error) {
            throw error;
            response.error(res);
        } else {
            response.ok(rows, res);
        }
    });
};

exports.insert_note = function (req, res) {
    let note = req.body.note;
    let id_category = req.body.id_category;
    let time = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

    if (typeof note == 'undefined' || typeof id_category == 'undefined') {
        response.ok("Field note or id_category cannot null or empty", res);
    } else {
        connection.query(`INSERT INTO data_note  set note=?, time=?, id_category=?`, [note, time, id_category],
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

exports.update_note = function (req, res) {
    let id = req.params.id;
    let id_category = req.body.id_category;
    let note = req.body.note;

    if (typeof id_category == 'undefined' || typeof note == 'undefined') {
        response.ok("Field note or id_category cannot null or empty", res);
    } else {
        connection.query(`UPDATE data_note SET note=?, id_category=? WHERE id=?;`, [note, id_category, id],
            function (error, result, field) {
                if (error) throw error;
                (result.affectedRows == 0) ? response.ok("Update Note didn't work", res) : response.ok("Note has been update!", res);
            }
        )
    }
};

exports.delete = function (req, res) {

    connection.query(`delete from data_note where id =?`, [req.params.id],
        function (error, result, fields) {
            if (error) throw error;
            (result.affectedRows == 0) ? response.ok("id not found!", res) : response.ok("Note has been deleted!", res);
        }
    )
};