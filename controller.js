'use strict'

const response = require('./response');
const connection = require('./connect');
const dateFormat = require('dateformat');

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
exports.listNoteId = function (req, res) {
    const sql = `SELECT data_note.id, data_note.title, data_note.note, data_note.time, category_note.name as "name_category"
                 FROM data_note LEFT JOIN category_note 
                 ON data_note.id_category=category_note.id 
                 WHERE data_note.id = '${req.query.id}'`;
    connection.query(sql, function (error, rows, field) {
        if (error) {
            throw error;
        } else {
            (rows.length > 0) ? response.ok(rows, res) : response.ok("Note does not exit", res);
        }
    });
};
exports.insertNote = function (req, res) {
    let note = req.body.note;
    let id_category = req.body.id_category;
    let title = req.body.title;
    let time = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

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

    if (typeof id_category == 'undefined' || typeof note == 'undefined' || typeof title == 'undefined') {
        response.ok("Field note or id_category cannot null or empty", res);
    } else {
        connection.query(`UPDATE data_note SET title=?, note=?, id_category=? WHERE id=?;`, [title, note, id_category, id],
            function (error, result, field) {
                if (error) throw error;
                (result.affectedRows == 0) ? response.ok("Update Note didn't work", res) : response.ok("Note has been update!", res);
            }
        )
    }
};
exports.deleteNote = function (req, res) {

    connection.query(`delete from data_note where id =?`, [req.params.id],
        function (error, result, fields) {
            if (error) throw error;
            (result.affectedRows == 0) ? response.ok("id not found!", res) : response.ok("Note has been deleted!", res);
        }
    )
};
exports.searchNote = function (req, res) {
    const title = req.query.search || "";
    const sql = `SELECT data_note.id, data_note.title, data_note.note, 
                data_note.time, category_note.name as "name_category" 
                FROM data_note LEFT JOIN category_note 
                ON data_note.id_category=category_note.id
                WHERE data_note.title LIKE '%${title}%'`;
    connection.query(sql, function (error, rows, field) {
        if (error) {
            throw error;
        } else {
            (rows.length > 0) ? response.ok(rows, res) : response.ok("Note does not exit", res);
        }
    });
};
exports.sortNote = function (req, res) {
    const sql = `SELECT data_note.id, data_note.title, data_note.note, 
                data_note.time, category_note.name as "name_category"
                FROM data_note LEFT JOIN category_note 
                ON data_note.id_category=category_note.id
                ORDER BY data_note.title ASC`;
    connection.query(sql, function (error, rows, field) {
        if (error) {
            throw error;
        } else {
            (rows.length > 0) ? response.ok(rows, res) : response.ok("Note does not exit", res);
        }
    });
};

//Controller Category
exports.listCategory = function (req, res) {
    connection.query(`select * from category_note`, function (error, rows, field) {
        if (error) {
            throw error;
            response.error(res);
        } else {
            response.ok(rows, res);
        }
    });
};
exports.insertCategory = function (req, res) {
    let name = req.body.name;

    if (typeof name == 'undefined') {
        response.ok("Field name cannot null or empty", res);
    } else {
        connection.query(`INSERT INTO category_note set name=?`, [name],
            function (error, rows, field) {
                if (error) {
                    throw error;
                    response.error(res)
                } else {
                    let data = {
                        error: false,
                        data: rows,
                        message: 'New data has been created',
                    };
                    response.ok(data, res)
                }
            })
    }
};
exports.updateCategory = function (req, res) {
    let id = req.params.id;
    let name = req.body.name;

    if (typeof name == 'undefined') {
        response.ok("Field name cannot null or empty", res);
    } else {
        connection.query(`UPDATE category_note SET name=? WHERE id=?`, [name, id],
            function (error, result, field) {
                if (error) throw error;
                (result.affectedRows == 0) ? response.ok("Update Category didn't work", res) : response.ok("Category has been update!", res);
            }
        )
    }
};
exports.deleteCategory = function (req, res) {
    connection.query(`delete from category_note where id =?`, [req.params.id],
        function (error, result, fields) {
            if (error) throw error;
            (result.affectedRows == 0) ? response.ok("id not found!", res) : response.ok("Category has been deleted!", res);
        }
    )
};
