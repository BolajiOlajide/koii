'use strict';
const express = require('express');

const utils = require('./utils');


const koii = express();

/**
 * method for displaying routes in an express application
 *
 * @returns {null} null
 */
function displayRoutes() {
  utils.validateApplication(koii.parent);
  const env = koii.parent.settings.env;
  console.log(utils.internals.printRow('cyan', 'Environment: ' + env));
  const routerObj = koii.parent._router.stack; // eslint-disable-line no-underscore-dangle
  const routes = utils.getUniqueRoutes(routerObj);
  const formattedRoutes = utils.formatRoutes(routes);
  console.log(formattedRoutes);
}

koii.on('mount', displayRoutes);


module.exports = koii;
