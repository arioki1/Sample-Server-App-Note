'use strict'

module.exports = function (app) {
    const controllerCategory = require('../controllers/controllerCategory');
    //Route API Category
    app.route('/categories').get(controllerCategory.category);
    app.route('/categories').post(controllerCategory.insertCategory);
    app.route('/categories/:id').delete(controllerCategory.deleteCategory);
    app.route('/categories/:id').patch(controllerCategory.updateCategory);
};