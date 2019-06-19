'use strict'

exports.ok = function (values, res) {
    const data = {
        status: 200,
        values: values
    };
    res.json(data);
    res.end();
};

exports.error = function (res) {
    const data = {
        status: 200,
        values: "System Error"
    };
    res.json(data);
    res.end();
};