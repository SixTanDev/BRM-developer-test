const express = require('express');

const app    = express();
const routes = require('./routes');


module.exports = (config) => {
  const log = config.log();

  // Add a request logging middleware in development mode
  if (app.get('env') === 'development') {
    app.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  app.use('/', routes());

  return app;
};