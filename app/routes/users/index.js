const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  attachBcryptSaltPassword,
  attachBcryptSaltToken,
} = require("../../service/middleware");
const { restart } = require("nodemon");
const router = express.Router();

router.use(attachBcryptSaltPassword);
router.use(attachBcryptSaltToken);

module.exports = (userService) => {
  /**
   * @api {post} /register Register User
   * @apiName RegisterUser
   * @apiGroup Users
   *
   * @apiParam {String} name User's name.
   * @apiParam {String} email User's email.
   * @apiParam {String} password User's password.
   *
   * @apiSuccess {String} message Success message.
   * @apiSuccess {Object} data_user Data of the registered user.
   *
   * @apiSuccessExample {json} Successful Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "The resource has been created successfully.",
   *       "data_user": {
   *           "id": 1,
   *           "name": "User's name",
   *           "email": "user@example.com",
   *           ...
   *       }
   *     }
   *
   * @apiError {String} error Error message.
   * @apiError {String} detail Additional error details.
   *
   * @apiErrorExample {json} Error Processing Password:
   *     HTTP/1.1 500 Internal Server Error
   *     {
   *       "error": "Error processing password",
   *       "detail": "The password: 123456 must be a string"
   *     }
   *
   * @apiErrorExample {json} Other Error:
   *     HTTP/1.1 500 Internal Server Error
   *     {
   *       "error": "Internal server error",
   *       "data": {
   *           "name": "User's name",
   *           "email": "user@example.com",
   *           ...
   *       },
   *       "severity": "High priority",
   *       "status_code": 500,
   *       "info_dev": { ... }
   *     }
   */
  router.post("/register", async (req, res) => {
    try {
      const userData = req.body;
      const bcryptSalt = req.bcryptSaltPasawword;

      userData.name = userData.name.toLowerCase();
      userData.lastName = userData.lastName.toLowerCase();
      userData.email = userData.email.toLowerCase();
      try {
        userData.password = bcrypt.hashSync(userData.password, bcryptSalt);
      } catch (hashError) {
        return res.status(500).json({
          error: "Error processing password",
          detail: `'The password: ${userData.password} must be a string`,
        });
      }

      const user = await userService.createUser(userData);
      res.status(200).send({
        message: "The resource has been created successfully.",
        data_user: user,
      });
    } catch (err) {
      res.status(err.status_code).send(err);
    }
  });

  /**
   * @api {post} /login Login
   * @apiName Login
   * @apiGroup Users
   *
   * @apiParam {String} email User's email.
   * @apiParam {String} password User's password.
   *
   * @apiSuccess {String} token Generated authentication token.
   *
   * @apiSuccessExample {json} Successful Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *     }
   *
   * @apiError {String} error Error message.
   *
   * @apiErrorExample {json} Incorrect Credentials:
   *     HTTP/1.1 401 Unauthorized
   *     {
   *       "error": "Incorrect credentials"
   *     }
   *
   * @apiErrorExample {json} Other Error:
   *     HTTP/1.1 500 Internal Server Error
   *     {
   *       "error": "Internal server error",
   *       "data": { ... },
   *       "severity": "High priority",
   *       "status_code": 500,
   *       "info_dev": { ... }
   *     }
   */
  router.post("/login", async (req, res) => {
    try {
      const userData = req.body;
      const bcryptSalt = req.bcryptSaltToken;

      userData.email = userData.email.toLowerCase();
      const user = await userService.filterUsers({ email: userData.email });

      if (user.length === 0) {
        const err = {
          message: "Users o User not found",
          detail: "No users match the specified criteria",
          severity: "error",
          status_code: 404,
        };
        res.status(err.status_code).json({ err });
      } else {
        const passOk = bcrypt.compareSync(userData.password, user[0].dataValues.password);

        if (passOk) {
          const token = jwt.sign({ user: user }, bcryptSalt);

          res.status(200).json({ token: token });
        } else {
          res.status(401).json({ error: "Credenciales incorrectas" });
        }
      }
    } catch (err) {
      res.status(err.status_code).json(err);
    }
  });

  return router;
};
