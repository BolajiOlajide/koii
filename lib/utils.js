const Table = require('easy-table');
const chalk = require('chalk');


/**
 * prepare application routes
 *
 *
 * [... { method: path }] i.e. [... { 'GET': '/hello' }]
 *
 *
 * @param {Array} routerStack
 * @returns {Array}
 * @api private
 */
exports.getRoutes = routerStack => {
  const routes = [];

  routerStack.forEach(({ route = null }) => {
    if (route) {
      const { stack, path } = route;

      stack.forEach(({ method = null }) => {
        if (method) {
          const httpMethod = method.toUpperCase();

          routes.push({
            method: httpMethod,
            path
          });
        }
      });
    }
  });

  return routes;
};

/**
 * validate parent application instance
 *
 * @param {Object} app
 * @returns {Boolean}
 * @exception {Object}
 * @api private
 */
exports.validate = app => {
  if (!app) {
    const message = 'Cannot detect an express application. Check Koii is within an express application';
    throw new Error(message);
  } else if (!app._router || !Array.isArray(app._router.stack)) { // eslint-disable-line
    const message = 'Cannot detect routes in the express application.';
    throw new Error(message);
  }

  return true;
};

/**
 * format and style application routes.
 *
 * @param {Array} routes
 * @returns {String} styled
 * @api private
 */
exports.formatRoutes = routes => {
  return Table.print(routes, ({ method, path }, cell) => {
    for (const [attr, color, title] of [[method, 'green', 'METHOD'], [path, 'white', 'PATH']]) {
      cell(this.style(title, 'cyan'), this.style(attr, color))
    }
  });
};

/**
 * log.
 *
 * @api private
 */
exports.log = console.log;

/**
 * style text with given color.
 *
 * @param {String} text
 * @param {String} color
 * @returns {String}
 * @api private
 */
exports.style = (text, color) => {
  return chalk[color](text);
}
