'use stric';

module.exports = function (app) {
    const controller = require('./controller');
    //Route API Note
    app.route('/').get(controller.home);
    app.route('/list_note').get(controller.list_note);
    app.route('/insert_note').post(controller.insert_note);
    app.route('/delete_note/:id').delete(controller.delete);
    app.route('/update_note/:id').patch(controller.update_note);

};