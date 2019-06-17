'use strict';

const response = require('./response');
const connection = require('./connect');

exports.home = function (req, res) {
    response.ok('Welcome to Server Sample Note App API');
};