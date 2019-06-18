require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const dateFormat = require('dateformat');
const port = process.env.SERVER_PORT || 3000;
const cors = require('cors');

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(
    function (req, res, next) {
        console.log(`TIME: ${dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")} HOST ${req.headers.host} PATH : ${req.path}`);
        next();
    }
);

app.use(bodyParser.json());

routes(app);

app.listen(port);
console.log('Server Started');
