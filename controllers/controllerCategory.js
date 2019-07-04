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
    sql = sql.concat(`ORDER BY category_note.${orderBy || 'name'} ${sort || 'ASC'} `);
    console.log("mausk 1")
    console.log(sql);
    connection.query(sql, function (error, rows, field) {
        if (error) {
            console.log("mausk 2");
            console.log(error);
            response.errorWithCode(400, "Note does not found", res);
        } else {
            console.log("mausk 3");
            if (rows.length > 0) {
                console.log("mausk 4");
                response.success(rows, res)
            } else {
                console.log("mausk 5");
                response.errorWithCode(400, "Note does not found", res);
            }
        }
    });
};
exports.insertCategory = function (req, res) {
    let name = req.body.name;
    let image = req.body.image;

    if (typeof name == 'undefined' || typeof image == 'undefined') {
        response.errorWithCode(400, "Field name cannot null or empty", res);
    } else {
        connection.query(`INSERT INTO category_note set name=?, image=?`, [name, image],
            function (error, rows, field) {
                if (error) {
                    throw error;
                    response.errorWithCode(400, "Field name cannot null or empty", res);
                } else {

                    let sqlNew = 'SELECT * FROM category_note ORDER BY category_note.id DESC LIMIT 1';

                    connection.query(sqlNew,
                        function (error, rows, field) {
                            if (error) {
                                response.errorWithCode(400, "Field name cannot null or empty", res);
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
            })
    }
};
exports.updateCategory = function (req, res) {
    let id = req.params.id;
    let name = req.body.name;
    let image = req.body.image;

    if (typeof name == 'undefined' || typeof image == 'undefined') {
        response.errorWithCode(400, "Field name cannot null or empty", res);
    } else {
        connection.query(`UPDATE category_note SET name=?, image=? WHERE id=?`, [name, image, id],
            function (error, result, field) {
                if (error) {
                    response.errorWithCode(400, "Update Category didn't work", res)
                } else {
                    if (result.affectedRows == 0) {
                        response.errorWithCode(400, "Update Category didn't work", res)
                    } else {
                        connection.query('SELECT * FROM category_note WHERE id =?', [id],
                            function (error, rows, field) {
                                if (error) {
                                    response.errorWithCode(400, "Update Category didn't work", res)
                                } else {
                                    let data = {
                                        error: false,
                                        data: rows,
                                        message: 'Category has been update!',
                                    }
                                    response.success(data, res)
                                }
                            })
                    }
                }

            }
        )
    }
};

exports.deleteCategory = function (req, res) {
    connection.query(`delete from category_note where id =?`, [req.params.id],
        function (error, result, fields) {
            if (error) {
                response.errorWithCode(400, "Id Not Found", res)
            } else {
                if (result.affectedRows == 0) {
                    response.errorWithCode(400, "Id Not Found", res)
                } else {
                    let data = {
                        error: false,
                        id: req.params.id,
                        message: "Category has been deleted!"
                    }
                    response.success(data, res);
                }
            }
        }
    )
};