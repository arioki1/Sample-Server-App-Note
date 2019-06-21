require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const dateFormat = require('dateformat');
const port = process.env.SERVER_PORT || 3000;
const cors = require('cors');

const whitelist = ['http://192.168.6.101', 'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop'];

const corsOptions = {
    origin: function (origin, next) {
        console.log(origin);
        if (whitelist.indexOf(origin) !== -1) {
            next()
        } else {
            next("Not allowed by CORS");
        }
    }
};


app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
    cors(),
    function (req, res, next) {
        console.log(`TIME: ${dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")} HOST ${req.headers.host}  PATH : ${req.path} METHOD ${req.method} ORIGIN ${req.headers.origin}`);
        next();
    },
);

app.use(bodyParser.json());

routes(app);
app.listen(port);

const os = require('os');
let networkInterfaces = os.networkInterfaces();
for (let inet in networkInterfaces) {
    let addresses = networkInterfaces[inet];
    for (let i = 0; i < addresses.length; i++) {
        let address = addresses[i];
        if (!address.internal) {
            console.log(`_____________Server Started ${address.address}:${port}____________________`);
        }
    }
}

