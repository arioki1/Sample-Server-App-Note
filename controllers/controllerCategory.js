'use strict'

const response = require('../libs/response');
const connection = require('../config/database');

//Controller Category
exports.category = function (req, res) {
    const select = req.query.select;
    const searchBy = req.query.search_by;
    const search = req.query.search;
    const id = req.query.id;
    const orderBy = req.query.order_by;
    const sort = req.query.sort;

    const page = req.query.page;
    const limit = req.query.limit;
    let end = (page || 1) * (limit || 5);
    let start = end - (limit || 5);

    let sql = "";
    const table = 'category_note';

    sql = (select) ? sql.concat(`SELECT ${select} FROM ${table} `) : sql.concat(`SELECT * FROM ${table} `);
    sql = (search || (search && searchBy) || id) ? sql.concat(`WHERE `) : sql;
    sql = (search) ? sql.concat(`category_note.${searchBy || 'name'} LIKE '%${search}%' `) : sql;
    sql = (search && id) ? sql.concat(`AND `) : sql;
    sql = (id) ? sql.concat(`category_note.id = '${id}' `) : sql;
    sql = (orderBy || sort) ? sql.concat(`ORDER BY category_note.${orderBy || 'name'} ${sort || 'DESC'} `) : sql;
    sql = (page || limit) ? sql.concat(`LIMIT ${start}, ${end}`) : sql;

    connection.query(sql, function (error, rows, field) {
        if (error) {
            console.log(error);
            response.success("Note does not found", res);
        } else {
            (rows.length > 0) ? response.success(rows, res) : response.success("Note does not found", res);
        }
    });
};
exports.insertCategory = function (req, res) {
    let name = req.body.name;

    if (typeof name == 'undefined') {
        response.success("Field name cannot null or empty", res);
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
                    response.success(data, res)
                }
            })
    }
};
exports.updateCategory = function (req, res) {
    let id = req.params.id;
    let name = req.body.name;

    if (typeof name == 'undefined') {
        response.success("Field name cannot null or empty", res);
    } else {
        connection.query(`UPDATE category_note SET name=? WHERE id=?`, [name, id],
            function (error, result, field) {
                if (error) throw error;
                (result.affectedRows == 0) ? response.success("Update Category didn't work", res) : response.success("Category has been update!", res);
            }
        )
    }
};
exports.deleteCategory = function (req, res) {
    connection.query(`delete from category_note where id =?`, [req.params.id],
        function (error, result, fields) {
            if (error) throw error;
            (result.affectedRows == 0) ? response.success("id not found!", res) : response.success("Category has been deleted!", res);
        }
    )
};

