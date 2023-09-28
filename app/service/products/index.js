const { Product } = require("../../models");
const { ValidationError, UniqueConstraintError } = require("sequelize"); // Importa las excepciones específicas

class ProductService {
  /**
   * Creates a new product with the provided data.
   * @param {Object} productData - The product data to create.
   * @throws {Object} An error object in case of failure.
   * @returns {Promise<Object>} A promise that resolves with the created product.
   */
  async createProduct(productData) {
    try {
      return await Product.create(productData);
    } catch (error) {
      if (error instanceof ValidationError) {
        const err = {
          message: "Validation error",
          detail: `${error.errors[0].message} ${error.parent.detail}`,
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
   * Deletes a product based on the specified criteria.
   * @param {Object} filterCriteria - Criteria for identifying the product to delete.
   * @throws {Object} An error object in case of failure.
   * @returns {Promise<void>} A promise that resolves once the product is deleted.
   */
  async deleteProduct(filterCriteria) {
    try {
      const result = await Product.destroy({
        where: filterCriteria,
      });

      if (result === 0) {
        const err = {
          message: "Product not found",
          detail: "No product matches the specified criteria",
          severity: "error",
          status_code: 404,
        };
        throw err;
      }
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

  /**
   * Updates a product based on the specified criteria and new data.
   * @param {Object} filterCriteria - Criteria for identifying the product to update.
   * @param {Object} newProductData - New data for the product.
   * @throws {Object} An error object in case of failure.
   * @returns {Promise<void>} A promise that resolves once the product is updated.
   */
  async updateProduct(filterCriteria, newProductData) {
    try {
      const [updatedCount] = await Product.update(newProductData, {
        where: filterCriteria,
      });

      if (updatedCount === 0) {
        const err = {
          message: "Product not found",
          detail: "No product matches the specified criteria",
          severity: "error",
          status_code: 404,
        };
        throw err;
      }
    } catch (error) {
      throw {
        message: "Internal server error",
        data: { filterCriteria, newProductData },
        severity: "High priority",
        status_code: 500,
        info_dev: error,
      };
    }
  }

  /**
   * Reads one or all products based on the specified criteria.
   * @param {Object} filterCriteria - Criteria for reading products.
   * @throws {Object} An error object in case of failure.
   * @returns {Promise<Object>} A promise that resolves with the product(s).
   */
  async readProducts(filterCriteria = {}) {
    try {
      const products = await Product.findAll({
        where: filterCriteria,
      });

      if (products.length === 0) {
        const err = {
          message: "Products not found",
          detail: "No products match the specified criteria",
          severity: "error",
          status_code: 404,
        };
        throw err;
      }

      return products;
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

module.exports = ProductService;
