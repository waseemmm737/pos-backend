var express = require('express');
const cors = require('cors');
require('dotenv').config();
var sql = require("mssql");
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var config = {
    user: process.env.user,
    password: process.env.password,
    server: process.env.server,
    database: process.env.database,
    port: 1433,
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};
function availableRoutes() {
    return app._router.stack
        .filter(r => r.route)
        .map(r => {
            return {
                method: Object.keys(r.route.methods)[0].toUpperCase(),
                path: r.route.path
            };
        });
}
app.route('/').get(function (req, res) {
    res.send('<h1>Express server is working</h1><a href="/example">Click to see examples routes</a>');
});

app.route('/example').get(function (req, res) {
    res.json({
        status: 'Express server is running',
        routes: availableRoutes()
    });
});

sql.connect(config, function (err) {
    if (err) return console.log(err);
    console.log("Database Connected ✓");
    require('./Routes')(app, sql);
    console.log("Routes Available ✓");
});

app.listen(process.env.PORT || 5000)
exports = module.exports = app;
