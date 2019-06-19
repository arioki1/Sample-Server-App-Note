'use strict'


module.exports = function (app) {
    const controllerNotes = require('./controllerNotes');
    const controllerCategory = require('./controllerCategory');
    //Route API Note
    app.route('/').get(controllerNotes.home);
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
    app.route('/notes').post(controllerNotes.insertNote);
    app.route('/notes/:id').delete(controllerNotes.deleteNote);
    app.route('/notes/:id').patch(controllerNotes.updateNote);

    //Route API Category
    app.route('/category').get(controllerCategory.listCategory);
    app.route('/category').post(controllerCategory.insertCategory);
    app.route('/category/:id').delete(controllerCategory.deleteCategory);
    app.route('/category/:id').patch(controllerCategory.updateCategory);
};