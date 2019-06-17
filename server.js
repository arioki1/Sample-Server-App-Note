const express = require('express');
const app = express();
const port = process.env.PORT || 300;
const bodyParser = require('body-parse');
const routes = require('./routes');

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());

routes(app);

app.listen(port);

console.log('Server Started');