'use stric';

module.exports = function (app) {
    const controller = require('./controller');
    //Route API Note
    app.route('/').get(controller.home);
    app.route('/list_note').get(controller.list_note);
    app.route('/insert_note').post(controller.insert_note);
    app.route('/delete_note/:id').delete(controller.delete_category);
    app.route('/update_note/:id').patch(controller.update_note);

    //Route API Category
    app.route('/list_category').get(controller.list_category);
    app.route('/insert_category').post(controller.insert_category);
    app.route('/delete_category/:id').delete(controller.delete_category);
    app.route('/update_category/:id').patch(controller.update_category);

};