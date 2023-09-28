const bcrypt = require("bcryptjs");

const bcryptSaltPasawword = bcrypt.genSaltSync(10);
const bcryptSaltToken = bcrypt.genSaltSync(20);

function attachBcryptSaltPassword(req, res, next) {
  req.bcryptSaltPasawword = bcryptSaltPasawword;
  next();
}

function attachBcryptSaltToken(req, res, next) {
  req.bcryptSaltToken = bcryptSaltToken;
  next();
}

module.exports = {
  attachBcryptSaltPassword,
  attachBcryptSaltToken,
};
