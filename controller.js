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
            response.error(res);
        } else {
            response.ok(rows, res);
        }
    });
};

exports.insert_note = function (reg, res) {
    let note = reg.body.note;
    let id_category = reg.body.id_category;
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