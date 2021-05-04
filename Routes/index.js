module.exports = function (app, sql) {
    app.route("/user/").get(function (req, res) {
        res.json("Express server is running (User)");
    });

    app.route("/user/add").post(function (req, res) {
        let { email, name, password, username } = req.body
        let query = "INSERT INTO Users (email,name,password,username,isAdmin) VALUES(" +
            " '" + email + "'" +
            ", '" + name + "'" +
            ", '" + password + "'" +
            ", '" + username + "',0)"
        new sql.Request().query(query, (err, result) => {
            if (err) return res.status(404).json(err);
            res.status(200).json(`Success > ${query}`);
        })
    });

    app.route("/user/get").get(function (req, res) {
        new sql.Request().query('select * from Users', (err, result) => {
            if (err) return res.json(err);
            res.json(result.recordsets[0]);
        })
    });

    app.route("/user/get/:email").get(function (req, res) {
        let query = "select * from Users where email='" + req.params.email + "'"
        new sql.Request().query(query, (err, result) => {
            if (err) return res.json(err);
            res.json(result.recordset[0]);
        })
    });

    app.route("/user/update/:id").post(function (req, res) {
        res.status(200).json("update by id pending");

    });

    app.route("/user/delete/:email").delete(function (req, res) {
       let query = "Delete from Users where email='" + req.params.email + "'"
        new sql.Request().query(query, (err, result) => {
            if (err) return res.json(err);
            res.json(result.recordset[0]);
        })

    });

    //other routes..
};
