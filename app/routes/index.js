const express = require("express");
const router = express.Router();

const usersRoute = require("./users");
const productRoute = require("./products")

module.exports = (params) => {
  /**
   * @api {get} / Get server status
   * @apiName GetStatus
   * @apiGroup Status
   *
   * @apiSuccess {String} message Status message.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "Server is up and running"
   *     }
   */
  router.get("/", (req, res) => {
    res.status(200).json("Server is up and running");
  });

  router.use("/user", usersRoute(params.userService));
  router.use("/product", productRoute(params.productService));

  return router;
};
