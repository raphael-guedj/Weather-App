var express = require("express");
var router = express.Router();

var userData = require("../models/users");

/* GET sign-up page. */
router.post("/sign-up", async function (req, res, next) {
  var userSaved;
  var userfind = await userData.userModel.findOne({
    email: req.body.email,
  });
  console.log(userfind);

  if (userfind === null) {
    var user = new userData.userModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    userSaved = await user.save();

    //enregistrement de l'id et le nom en session de variable

    req.session.user_id = userSaved._id;
    req.session.name = userSaved.username;
    // console.log(req.session);

    res.redirect("/weather");
  } else {
    res.render("login");
  }
});

/* Sign-in route */
router.post("/sign-in", async function (req, res, next) {
  // console.log(req.body);

  var searchUser = await userData.userModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  console.log(searchUser);

  if (searchUser !== null) {
    req.session.user_id = searchUser._id;
    req.session.name = searchUser.username;
    res.redirect("/weather");
  } else {
    res.render("login", {});
  }
});

/*route log out */

router.get("/logout", async function (req, res) {
  console.log(req.session);
  req.session.user_id = undefined;
  req.session.name = undefined;
  console.log(req.session);
  res.redirect("/");
});

module.exports = router;
