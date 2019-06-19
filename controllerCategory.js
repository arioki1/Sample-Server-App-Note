'use strict'

const response = require('./response');
const connection = require('./connect');

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

