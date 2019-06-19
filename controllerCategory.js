'use strict'

const response = require('./response');
const connection = require('./connect');

//Controller Category
exports.category = function (req, res) {
    const searchBy = req.query.search_by;
    const search = req.query.search;
    const id = req.query.id;
    const orderBy = req.query.order_by;
    const sort = req.query.sort;

    const page = req.query.page;
    const limit = req.query.limit || 5;
    let end = page * limit;
    let start = end - limit;

    let sql = `SELECT * FROM category_note`;

    sql = (search || (search && searchBy) || id) ? sql.concat(`WHERE `) : sql;
    sql = (search) ? sql.concat(`category_note.${searchBy ? searchBy : 'title'} LIKE '%${search}%' `) : sql;
    sql = (search && id) ? sql.concat(`AND `) : sql;
    sql = (id) ? sql.concat(`category_note.id = '${id}' `) : sql;
    sql = (orderBy) ? sql.concat(`ORDER BY category_note.${orderBy ? orderBy : 'name'} `) : sql;
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

