require('dotenv').config({ path: './config/.env' });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routesNote = require('./routes/notes');
const routesCategory = require('./routes/category');
const dateFormat = require('dateformat');
const port = process.env.SERVER_PORT || 3000;
const cors = require('cors');

const whitelist = ['http://192.168.6.101', 'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop',undefined];

const corsOptions = {
    origin: function (origin, next) {
        console.log("[CROS]");
        console.log("Origin : "+origin);
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
    function (req, res, next) {
        console.log("[LOG]");
        console.log(`\nTIME : ${dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")} \nHOST : ${req.headers.host} \nURL : ${req.url} \nMETHOD : ${req.method} \nUser Agent : ${req.headers["useragent"]} \n`);
        next();

    },
    cors(corsOptions),
);

app.use(bodyParser.json());

routesNote(app);
routesCategory(app);
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
