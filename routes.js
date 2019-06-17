'use stric';

module.exports = function (app) {
    const controller = require('./controller');
    //Route API
    app.route('/').get(controller.home);
};