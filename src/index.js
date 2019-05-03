'use strict';

const express = require('express');
const {
  validate,
  getRoutes,
  formatRoutes,
  log,
  style
} = require('./utils');

const koii = express();

/**
 * method for displaying routes in an express application
 *
 * @param   {express.Application}   parent instance of the parent app
 * @returns {null}                  log details containing app routes
 */
const displayRoutes = parent => {
  const isValid = validate(parent);

  if (isValid) {
    const { settings, _router } = parent;
    const routes = getRoutes(_router.stack);
    const formattedRoutes = formatRoutes(routes);

    log((style('NODE_ENV=' + settings.env, 'cyan')));
    log(formattedRoutes);
  }
};

koii.on('mount', displayRoutes);


module.exports = koii;
