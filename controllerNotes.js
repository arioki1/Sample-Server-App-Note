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
    let sort = req.query.sort || "DESC";
    let by = req.query.by || "time";

    const sql = `SELECT data_note.id, data_note.title, data_note.note, 
                data_note.time, category_note.name as "name_category"
                FROM data_note LEFT JOIN category_note 
                ON data_note.id_category=category_note.id
                ORDER BY data_note.${by} ${sort}`;
    connection.query(sql, function (error, rows, field) {
        if (error) {
            response.ok("Note does not found", res);
        } else {
            (rows.length > 0) ? response.ok(rows, res) : response.ok("Note does not found", res);
        }
    });
};
exports.pageNote = function (req, res) {
    let page = req.query.page || 0;
    let limit = 5;
    let countNote;
    let maxPage;
    let start;
    let end;
    /*
    //call Fn for db query with callback
        getCountNote(function(err,data){
            if (err) {
                // error handling code goes here
                console.log("ERROR : ",err);
            } else {
                // code to execute on data retrieval
                countNote = data;
            }
            console.log(countNote);
        });

        maxPage = countNote/limit;*/
    end = page * limit;
    start = end - limit;

    const sql = `SELECT data_note.id, data_note.title, data_note.note, 
                data_note.time, category_note.name as "name_category"
                FROM data_note LEFT JOIN category_note 
                ON data_note.id_category=category_note.id
                ORDER BY data_note.title ASC
                LIMIT ${start}, ${end}`;
    connection.query(sql, function (error, rows, field) {
        if (error) {
            throw error;
        } else {
            (rows.length > 0) ? response.ok(rows, res) : response.ok("Note does not exit", res);
        }
    });

};
