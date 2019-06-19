'use strict'


module.exports = function (app) {
    const controllerNotes = require('./controllerNotes');
    const controllerCategory = require('./controllerCategory');
    //Route API Note
    app.route('/').get(controllerNotes.home);
    app.route('/notes').get(controllerNotes.note);
    app.route('/notes').post(controllerNotes.insertNote);
    app.route('/notes/:id').delete(controllerNotes.deleteNote);
    app.route('/notes/:id').patch(controllerNotes.updateNote);

    //Route API Category
    app.route('/category').get(controllerCategory.category);
    app.route('/category').post(controllerCategory.insertCategory);
    app.route('/category/:id').delete(controllerCategory.deleteCategory);
    app.route('/category/:id').patch(controllerCategory.updateCategory);
};