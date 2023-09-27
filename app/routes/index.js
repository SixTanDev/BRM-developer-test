const express = require('express');
const router  = express.Router();

module.exports = () => {

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
  router.get('/', (req, res) => {
    res.status(200).json("Server is up and running");
  });

  return router;
};
