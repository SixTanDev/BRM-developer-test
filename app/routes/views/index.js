const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();

module.exports = (productService) => {
  /**
   * @api {get} /products Get a list of all products (endpoint public)
   * @apiName GetProducts
   * @apiGroup Product
   *
   * @apiSuccess {Array} products List of products.
   * @apiSuccess {Object} products.product Product details.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "products": [
   *         {
   *           "product": {
   *             // Product details here
   *           }
   *         },
   *         // Additional products here
   *       ]
   *     }
   *
   * @apiError {Number} status_code HTTP status code indicating the error.
   * @apiError {String} message Error message.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 500 Internal Server Error
   *     {
   *       "status_code": 500,
   *       "message": "Internal server error"
   *     }
   */
  router.get("/products", async (req, res) => {
    try {
      const allProducts = await productService.readProducts();
      res.status(200).send({
        products: allProducts,
      });
    } catch (err) {
      res.status(err.status_code).send(err);
    }
  });

  return router;
};
