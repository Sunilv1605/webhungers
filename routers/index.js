var express = require("express");
var router = express.Router();

const Auth_admin = require("./admin/auth");

const Frontend = require("./frontend/frontend");

router.use("/admin", Auth_admin);

router.use("/", Frontend);

/* GET home page. */
/* router.get("/", function (req, res, next) {
    // res.render("index", { title: "Tethyr" });
    res.json({ title: 'homepage'});
}); */

module.exports = router;