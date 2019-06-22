'use strict'

exports.success = function (values, res) {
    const data = {
        status: 200,
        values: values,
    };
    res.json(data);
    res.end();
};
exports.notes = function (value, res) {
    res.json(value);
    res.end();
};
exports.error = function (res) {
    const data = {
        status: 500,
        values: "System Error",
    };
    res.json(data);
    res.end();
};
exports.errorWithCode = function (code, value, res) {
    const data = {
        status: code,
        values: value
    };
    res.json(data);
    res.end();
};