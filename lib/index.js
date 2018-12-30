'use strict';
const express = require('express');

const utils = require('./utils');


const koi = express();

function displayRoutes() {
  utils.validateApplication(koi.parent);
  const env = koi.parent.settings.env;
  console.log(utils.internals.printRow('cyan', 'Environment: ' + env));
  console.log('\n');
  const routerObj = koi.parent._router.stack;
  const routes = utils.getUniqueRoutes(routerObj);
  const formattedRoutes = utils.formatRoutes(routes);
  console.log(formattedRoutes);
}

koi.on('mount', displayRoutes);


module.exports = koi;
