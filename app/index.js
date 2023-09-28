const express = require("express");

const app = express();
const routes = require("./routes");

const UserService = require("./service/users");
const ProductSerive = require("./service/products")

module.exports = (config) => {
  const log = config.log();

  const userService = new UserService();
  const productService = new ProductSerive();
  // Add a request logging middleware in development mode
  if (app.get("env") === "development") {
    app.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/", routes({ userService, productService }));

  return app;
};
