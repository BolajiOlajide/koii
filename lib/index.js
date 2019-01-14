'use strict';

const express = require('express');
const utils = require('./utils');

const koii = express();

/**
 * method for displaying routes in an express application
 *
 * @returns {null}
 */
const displayRoutes = parent => {
  const { validate, getRoutes, formatRoutes, log, style, } = utils;
  const isValid = validate(parent);

  if (isValid) {
    const { settings, _router } = parent;
    const routes = getRoutes(_router.stack)
    const formattedRoutes = formatRoutes(routes);

    log((style('NODE_ENV=' + settings.env, 'cyan')));
    log(formattedRoutes);
  }
}

koii.on('mount', displayRoutes);


module.exports = koii;
