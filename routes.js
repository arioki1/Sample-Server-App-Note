'use strict'

module.exports = function (app) {
    const controller = require('./controller');
    //Route API Note
    app.route('/').get(controller.home);
    app.route('/note').get(controller.listNote);
    app.route('/note').post(controller.insertNote);
    app.route('/note/:id').get(controller.listNoteId);
    app.route('/note/:id').delete(controller.deleteNote);
    app.route('/note/:id').patch(controller.updateNote);

    //Route API Category
    app.route('/category').get(controller.listCategory);
    app.route('/category').post(controller.insertCategory);
    app.route('/category/:id').delete(controller.deleteCategory);
    app.route('/category/:id').patch(controller.updateCategory);
};