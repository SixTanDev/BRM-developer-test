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

  /**
   * Reads one or all order based on the specified criteria.
   * @param {Object} filterCriteria - Criteria for reading order.
   * @throws {Object} An error object in case of failure.
   * @returns {Promise<Object>} A promise that resolves with the order(s).
   */
  async readOrder(filterCriteria = {}) {
    try {
      const order = await Order.findAll({
        where: filterCriteria,
      });

      return order;
    } catch (error) {
      throw {
        message: "Internal server error",
        data: filterCriteria,
        severity: "High priority",
        status_code: 500,
        info_dev: error,
      };
    }
  }
}

module.exports = OrderService;
