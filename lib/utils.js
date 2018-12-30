const EasyTable = require('easy-table');
const chalk = require('chalk');


const internals = {};

exports.getUniqueRoutes = function (routerObject) {
  const routes = [];

  routerObject.forEach(function (obj) {
    if (!obj.route) {
      return;
    }

    routes.push({
      method: obj.route.stack[0].method.toUpperCase(),
      path: obj.route.path
    });
    return routes;
  });

  return routes;
};

exports.validateApplication = function (app) {
  if (!app) {
    const messageOne = 'Cannot detect an express application. ';
    const messageTwo = 'Ensure you\'re making use of Koii within an express application';
    throw new Error(messageOne + messageTwo);
  } else if (!app._router || !Array.isArray(app._router.stack)) { // eslint-disable-line
    throw new Error('Cannot detect routes in the express application.');
  }
  return true;
};

exports.formatRoutes = function (routes) {
  const table = new EasyTable();

  routes.forEach(function (route) {
    const method = internals.printRow('cyan', 'method');
    const path = internals.printRow('cyan', 'path');
    table.cell(method, internals.printRow('green', route.method));
    table.cell(path, route.path);
    table.newRow();
  });

  return table.toString();
};

internals.printRow = function (color, string) {
  return chalk[color](string);
};

exports.internals = internals;
