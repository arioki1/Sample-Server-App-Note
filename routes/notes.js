'use strict'

module.exports = function (app) {
    const controllerNotes = require('../controllers/controllerNotes');

    //Route API Note
    app.route('/').get(controllerNotes.home);
    app.route('/notes').get(controllerNotes.note);
    app.route('/notes').post(controllerNotes.insertNote);
    app.route('/notes/:id').delete(controllerNotes.deleteNote);
    app.route('/notes/:id').patch(controllerNotes.updateNote);
};