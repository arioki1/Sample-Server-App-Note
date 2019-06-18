'use stric'

module.exports = function (app) {
    const controller = require('./controller');
    //Route API Note
    app.route('/').get(controller.home);
    app.route('/note/').get(controller.list_note);
    app.route('/note/:id').get(controller.list_note_id);
    app.route('/note').post(controller.insert_note);
    app.route('/note/:id').delete(controller.delete_note);
    app.route('/note/:id').patch(controller.update_note);

    //Route API Category
    app.route('/category').get(controller.list_category);
    app.route('/category').post(controller.insert_category);
    app.route('/category/:id').delete(controller.delete_category);
    app.route('/category/:id').patch(controller.update_category);
};