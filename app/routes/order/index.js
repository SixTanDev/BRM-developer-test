const express = require("express");
const {
  attachBcryptSaltPassword,
  decodeToken,
} = require("../../service/middleware");
const { restart } = require("nodemon");
const router = express.Router();

router.use(attachBcryptSaltPassword);
router.use(decodeToken);

module.exports = (orderService, productService) => {

  router.post("/order", async(req, res) => {
    try {
      const orderData = req.body;
      const user = req.user;
      const product = await productService.readProducts({id: orderData.product_id});
      const dataValuesProducto = product[0].dataValues

      const produictAvaible = (+dataValuesProducto.availableQTY) - (+orderData.quantityProduct)

      if (produictAvaible < 0) {
        res.status(422).send({
          message: "There are not enough items available to complete the purchase",
          available_elements: dataValuesProducto.availableQTY,
          requested_elements: orderData.quantityProduct,
        });
      }

      orderData.buyer_id = user.id
      orderData.lotNumber = dataValuesProducto.lotNumber
      orderData.totalPrice = (+dataValuesProducto.price) * (+orderData.quantityProduct)

      await productService.updateProduct({ id: dataValuesProducto.id }, {availableQTY: produictAvaible})
      const order = await orderService.createOrder(orderData);

      res.status(200).send({
        message: "The resource has been created successfully.",
        data_user: order,
      });
    } catch (err) {
      if (err.status_code) {
        res.status(err.status_code).send(err);
      }
      res.status(500).send(err);
    }
  });

  return router;
};
