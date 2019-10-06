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
    const environmentDetails = 'NODE_ENV=' + settings.env;

    log('-'.repeat(environmentDetails.length))
    log((style(environmentDetails, 'blue')));
    log('-'.repeat(environmentDetails.length))
    log(formattedRoutes);
  }
};

koii.on('mount', displayRoutes);


module.exports = koii;
