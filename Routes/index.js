module.exports = function (app, sql) {
    app.route("/user/").get(function (req, res) {
        res.json("Express server is running (User)");
    });

    app.route("/user/add").post(function (req, res) {
        let { email, name, password, username, isAdmin } = req.body
        let query = "INSERT INTO WebUsers (email,name,password,username,isAdmin) VALUES(" +
            " '" + email + "'" +
            ", '" + name + "'" +
            ", '" + password + "'" +
            ", '" + username + "'" +
            ","+ isAdmin + ")"
        new sql.Request().query(query, (err, result) => {
            if (err) return res.status(404).json("Not Found");
            res.status(200).json(`Success > ${query}`);
        })
    });

    app.route("/user/get").get(function (req, res) {
        new sql.Request().query('select * from WebUsers', (err, result) => {
            if (err) return res.json(err);
            res.json(result.recordsets[0]);
        })
    });

    app.route("/customer/get").get(function (req, res) {
        new sql.Request().query('select * from Customers', (err, result) => {
            if (err) return res.json(err);
            res.json(result.recordsets[0]);
        })
    });

    app.route("/product/get").get(function (req, res) {
        new sql.Request().query('select * from Products', (err, result) => {
            if (err) return res.json(err);
            res.json(result.recordsets[0]);
        })
    });

    app.route("/invoice/get").get(function (req, res) {
        new sql.Request().query('select * from Invoices i left join InvoiceItems ii on i.id = ii.invoiceId', (err, result) => {
            if (err) return res.json(err);
            res.json(result.recordsets[0]);
        })
    });

    app.route("/user/auth").post(function (req, res) {
        let query = "select * from WebUsers where username='" + req.body.username + "' AND password='" + req.body.password + "'"
        new sql.Request().query(query, (err, result) => {
            if (err) return res.status(404).json(err);
            res.status(200).json(result.recordset[0]);
        })
    });

    app.route("/user/delete/:email").delete(function (req, res) {
       let query = "Delete from WebUsers where email='" + req.params.email + "'"
        new sql.Request().query(query, (err, result) => {
            if (err) return res.json(err);
            res.json(result.recordset[0]);
        })
    });
};
