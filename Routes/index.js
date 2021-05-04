module.exports = function (app, sql) {
    app.route("/api/").get(function (req, res) {
        res.json("Express server is running (api)");
    });

    app.route("/api/add").post(function (req, res) {
        res.status(200).json("add");
        res.status(400).send(err);
    });

    app.route("/api/get").get(function (req, res) {
        res.status(200).json("get all");

    });

    app.route("/api/get/:id").get(function (req, res) {
        res.status(200).json("get by id");

    });

    app.route("/api/update/:id").post(function (req, res) {
        res.status(200).json("update by id");

    });

    app.route("/api/delete/:id").delete(function (req, res) {
        res.status(200).json("delete by id");

    });

    //other routes..
};
