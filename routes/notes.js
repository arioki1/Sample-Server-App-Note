'use strict'

module.exports = function (app) {
    const controllerNotes = require('../controllers/controllerNotes');
    const controllerCategory = require('../controllers/controllerCategory');

    //Route API Note
    app.route('/').get(controllerNotes.home);
    app.route('/notes').get(controllerNotes.note);
    app.route('/notes').post(controllerNotes.insertNote);
    app.route('/notes/:id').delete(controllerNotes.deleteNote);
    app.route('/notes/:id').patch(controllerNotes.updateNote);

    //Route API Category
    app.route('/categories').get(controllerCategory.category);
    app.route('/categories').post(controllerCategory.insertCategory);
    app.route('/categories/:id').delete(controllerCategory.deleteCategory);
    app.route('/categories/:id').patch(controllerCategory.updateCategory);
};