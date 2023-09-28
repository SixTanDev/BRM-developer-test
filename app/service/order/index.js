const { Order } = require("../../models");
const { ValidationError } = require("sequelize");

class OrderService {
  /**
   * Creates a new order with the provided data.
   * @param {Object} buyData - The buy data to create.
   * @throws {Object} An error object in case of failure.
   * @returns {Promise<Object>} A promise that resolves with the created product.
   */
  async createOrder(buyData) {
    try {
      return await Order.create(buyData);
    } catch (error) {
      if (error instanceof ValidationError) {
        const err = {
          message: "Validation error",
          detail: `${error.errors[0].message}`,
          severity: "error",
          status_code: 422,
        };
        throw err;
      } else {
        throw {
          message: "Internal server error",
          data: productData,
          severity: "High priority",
          status_code: 500,
          info_dev: error,
        };
      }
    }
  }
}

module.exports = OrderService;
