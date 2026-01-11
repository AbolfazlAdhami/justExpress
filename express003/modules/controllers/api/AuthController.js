const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transforms}/v1/UserTransform`);
const bcrypt = require("bcryptjs");

module.exports = new (class AuthController extends Controller {
  register(req, res) {
    req.checkBody("name", "Name is required for Register").notEmpty();
    req.checkBody("email", "Email is required for Register").notEmpty();
    req.checkBody("email", "Email Format is invalid").isEmail();
    req.checkBody("password", "Password is required for Register").notEmpty();

    if (this.showValidationErrors(req, res)) return;

    const { name, password, email } = req.body;
    this.model
      .User({
        name,
        email,
        password,
      })
      .save((err) => {
        if (err) {
          if (err.code == 1100) return res.json({ success: false, message: "This Email used before for Registration" });

          throw err;
        }
        return req.json({
          message: "User Registered successfully ",
          success: true,
        });
      });
  }
  login(req, res) {
    req.checkBody("email", "Email is required for Login").notEmpty();
    req.checkBody("email", "Email Format is invalid").isEmail();
    req.checkBody("password", "Password is required for Login").notEmpty();

    if (this.showValidationErrors(req, res)) return;

    const { password, email } = req.body;

    this.model.User.findOne({ email }, (user, err) => {
      if (err) throw err;

      if (!user) return res.status(422).json({ success: false, message: "Email Entered is wrong!" });

      bcrypt.compare(password, user.password, (err, status) => {
        if (err) throw err;

        if (!status) return res.status(422).json({ success: false, message: "Password is wrong" });

        return res.json({ data: new UserTransform().transform(user, true), message: "User Logged Successfully" });
      });
    });
  }
})();
