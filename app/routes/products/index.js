const express = require("express");
const {
  attachBcryptSaltPassword,
  accessResource,
} = require("../../service/middleware");
const { restart } = require("nodemon");
const router = express.Router();

router.use(attachBcryptSaltPassword);
router.use(accessResource);

module.exports = (productService) => {

  /**
   * @api {post} /register Create a new product
   * @apiName CreateProduct
   * @apiGroup Product
   *
   * @apiParam {Object} productData Product data to create.
   *
   * @apiSuccess {String} message Success message.
   * @apiSuccess {Object} data_user Created product data.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "The resource has been created successfully.",
   *       "data_user": { ... } // Product data
   *     }
   *
   * @apiError {Object} error Error object if the request fails.
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 422 Unprocessable Entity
   *     {
   *       "message": "Validation error",
   *       "detail": "Validation error message",
   *       "severity": "error",
   *       "status_code": 422
   *     }
   */
  router.post("/register", async (req, res) => {
    try {
      const productData = req.body;

      const product = await productService.createProduct(productData);
      res.status(200).send({
        message: "The resource has been created successfully.",
        data_user: product,
      });
    } catch (err) {
      res.status(err.status_code).send(err);
    }
  });

  /**
   * @api {put} /update/:productId Update a product
   * @apiName UpdateProduct
   * @apiGroup Product
   *
   * @apiParam {String} productId Product ID to update.
   * @apiParam {Object} updatedProductData Updated product data.
   *
   * @apiSuccess {String} message Success message.
   * @apiSuccess {Object} data_product Updated product data.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "The resource has been updated successfully.",
   *       "data_product": { ... } // Updated product data
   *     }
   *
   * @apiError {Object} error Error object if the request fails.
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "message": "Product not found",
   *       "detail": "No product matches the specified criteria",
   *       "severity": "error",
   *       "status_code": 404
   *     }
   */
  router.put("/update/:productId", async (req, res) => {
    try {
      const productId = req.params.productId;
      const updatedProductData = req.body;

      const updatedProduct = await productService.updateProduct(
        { id: productId },
        updatedProductData
      );

      res.status(200).send({
        message: "The resource has been updated successfully.",
        data_product: updatedProduct,
      });
    } catch (err) {
      res.status(err.status_code).send(err);
    }
  });

  /**
   * @api {delete} /delete/:productId Delete a product by ID
   * @apiName DeleteProduct
   * @apiGroup Product
   *
   * @apiParam {Number} productId Product's unique ID.
   *
   * @apiSuccess {String} message Success message.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "The resource has been deleted successfully."
   *     }
   *
   * @apiError {Number} status_code HTTP status code indicating the error.
   * @apiError {String} message Error message.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "status_code": 404,
   *       "message": "Product not found"
   *     }
   */
  router.delete("/delete/:productId", async (req, res) => {
    try {
      const productId = req.params.productId;

      await productService.deleteProduct({ id: productId });

      res.status(200).send({
        message: "The resource has been deleted successfully.",
      });
    } catch (err) {
      res.status(err.status_code).send(err);
    }
  });


  /**
   * @api {get} /myproducts Get a list of the user's products
   * @apiName GetUserProducts
   * @apiGroup Product
   *
   * @apiSuccess {Array} myProducts List of user's products.
   * @apiSuccess {Object} myProducts.product Product details.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "myProducts": [
   *         {
   *           "product": {
   *             // Product details here
   *           }
   *         },
   *         // Additional user's products here
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
  router.get("/myproducts", async (req, res) => {
    try {
      const user = req.user;

      const allMyProducts = await productService.readProducts({user_id: user.id});
      res.status(200).send({
        myProducts: allMyProducts,
      });
    } catch (err) {
      res.status(err.status_code).send(err);
    }
  });

  return router;
};
