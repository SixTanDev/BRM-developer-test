const { User } = require("../../models");
const { ValidationError, UniqueConstraintError } = require("sequelize"); // Importa las excepciones específicas

/**
 * Class that provides services related to users.
 */

class UserService {
  /**
   * Creates a new user with the provided data.
   * @param {Object} userData - The user data to create.
   * @throws {Object} An error object in case of failure.
   * @returns {Promise<Object>} A promise that resolves with the created user.
   */
  async createUser(userData) {
    try {
      return await User.create(userData);
    } catch (error) {
      if (error instanceof ValidationError) {
        const err = {
          message: "Validation error",
          detail: `error.errors[0].message ${error.parent.detail}`,
          severity: "error",
          status_code: 422,
        };
        throw err;
      } else if (error instanceof UniqueConstraintError) {
        const err = {
          message: "Unique constraint violation",
          detail: "email must be unique",
          severity: "error",
          status_code: 422,
        };
        throw err;
      } else {
        throw {
          message: "Internar server error",
          data: userData,
          severity: "High priority",
          status_code: 500,
          info_dev: error,
        };
      }
    }
  }

  /**
   * Filters users based on the specified criteria.
   * @param {Object} filterCriteria - Filtering criteria for users.
   * @throws {Object} An error object in case of failure.
   * @returns {Promise<Array>} A promise that resolves with a list of filtered users.
   */
  async filterUsers(filterCriteria) {
    try {
      const filteredUsers = await User.findAll({
        where: filterCriteria,
      });

      if (filteredUsers.length === 0) {
        const err = {
          message: "Users o User not found",
          detail: "No users match the specified criteria",
          severity: "error",
          status_code: 404,
        };
        throw err;
      }

      return filteredUsers;
    } catch (error) {
      if (
        error.message === "Users o User not found" &&
        error.detail === "No users match the specified criteria"
      ) {
        throw error;
      } else {
        throw {
          message: "Internar server error",
          data: filterCriteria,
          severity: "High priority",
          status_code: 500,
          info_dev: error,
        };
      }
    }
  }
}

module.exports = UserService;
