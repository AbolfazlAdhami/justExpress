const config = require("../../config");

const jwt = require("jsonwebtoken");
const User = require(`${config.path.model}/user`);
// const User = require("../../models/user");

module.exports = (req, res, next) => {
  let token = req.body.token || req.query.token || req.header("x-access-token");

  if (token) {
    return jwt.verify(token, config.secret, (err, decode) => {
      if (err) return res.json({ success: false, message: "Failed to authenticate token" });

      User.findById(decode.user_id, (err, user) => {
        if (err) throw err;

        if (!user) return res.json({ success: false, message: "User not Found!" });

        user.token = token;
        req.user = user;

        next();
      });
    });
  }

  return res.status(403).json({
    data: "Not token Provided",
    success: false,
  });
};
