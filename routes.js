'use strict'

module.exports = function (app) {
    const controller = require('./controller');
    //Route API Note
    app.route('/').get(controller.home);
    app.route('/notes').get(function (req, res) {
        console.log(req.query);
        const url = req.query;
        if ('search' in url) {
            controller.searchNote(req, res)
        } else if ('id' in url) {
            controller.listNoteId(req, res);
        } else if ('sort' in url) {
            controller.sortNote(req, res);
        } else if ('page' in url) {
            controller.pageNote(req, res);
        } else {
            controller.listNote(req, res)
        }
    });
    app.route('/notes').post(controller.insertNote);
    app.route('/notes/:id').delete(controller.deleteNote);
    app.route('/notes/:id').patch(controller.updateNote);

    //Route API Category
    app.route('/category').get(controller.listCategory);
    app.route('/category').post(controller.insertCategory);
    app.route('/category/:id').delete(controller.deleteCategory);
    app.route('/category/:id').patch(controller.updateCategory);
};