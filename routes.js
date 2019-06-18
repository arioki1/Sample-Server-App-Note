'use stric';

module.exports = function (app) {
    const controller = require('./controller');
    //Route API
    app.route('/').get(controller.home);
    app.route('/list_note').get(controller.list_note);
    app.route('/insert_note').post(controller.insert_note);
};