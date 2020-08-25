var express = require("express");
var router = express.Router();

const Auth_admin = require("./admin/auth");

router.use("/admin", Auth_admin);

/* GET home page. */
router.get("/", function (req, res, next) {
    
    // res.render("index", { title: "Tethyr" });
    res.json({ title: 'homepage'});
});

module.exports = router;