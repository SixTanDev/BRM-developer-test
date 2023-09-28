const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


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

function accessResource(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: 'An authentication token was not provided' });
  }

  jwt.verify(token, bcryptSaltToken, (err, decoded) => {
    console.log(err, decoded)
    if (err) {
      return res.status(401).json({ message: 'Invalid authentication token' });
    }

    if (decoded.user[0].user_type_id !== 1){
      return res.status(403).json({
        message: 'The user does not have access to the resource',
        detail: 'Access only for administrator',
      });
    }
    req.user = decoded;
    next();
  });
}


module.exports = {
  attachBcryptSaltPassword,
  attachBcryptSaltToken,
  accessResource
};
