const Transform = require("../Transform");
const jwt = require("jsonwebtoken");

module.exports = class UserTransform extends Transform {
  transform(item, createToken = false) {
    this.createToken = createToken;
    return {
      name: this.name,
      email: this.email,
      ...this.withToken(item),
    };
  }
  withToken(item) {
    if (item.token) return { token: item.token };

    if (item.createToken) {
      let token = jwt.sign({ user_id: item._id }, config.secret, { expiresIn: "120h" });
      return token;
    }
    return {};
  }
};
