const Table = require('easy-table');
const chalk = require('chalk');


/**
 * extract route information from stack
 *
 * @api private
 */
const extractRoutes = ({ method = null }, routes, path) => {
  if (method) {
    const httpMethod = method.toUpperCase();

    routes.push({
      method: httpMethod,
      path
    });
  }
}

/**
 * extract route information from stack
 *
 * @api private
 */
const extractRouterRoutes = ({ route = null }, routes) => {
  if (method && route) {
    const httpMethod = method.toUpperCase();

    routes.push({
      method: httpMethod,
      path: 'bolaji/'
    });
  }
}


/**
 * prepare application routes
 *
 *
 * [... { method: path }] i.e. [... { 'GET': '/hello' }]
 *
 *
 * @param {Array}   routerStack router stack
 * @returns {Array}             array of routes
 * @api private
 */
exports.getRoutes = routerStack => {
  const routes = [];
  // https://stackoverflow.com/questions/14934452/how-to-get-all-registered-routes-in-express/14934933

  routerStack.forEach((stack) => {
    const { route = null, name = null, handle = null } = stack;
    if (route) {
      const { stack, path } = route;
      console.log(stack[0].handle, path, stack.length, ' \n');

      stack.forEach(_stack => extractRoutes(_stack, routes, path));
    } else if (name === 'router') {
      console.log(stack)
      // console.log('mustafi', handle.stack)
      // const { route = null } = handle.stack[0];
      // console.log(route.methods, route.stack);
      // handle.stack.forEach(_stack => {
      //   console.log(_stack.route)
      // })

      // generate baseURL

      // get methods
    }
  });

  return routes;
};

/**
 * validate parent application instance
 *
 * @param {Object}      app    express application
 * @returns {Boolean}          boolean to show if app is a valid express app
 * @exception {Object}
 * @api private
 */
exports.validate = app => {
  if (!app) {
    const msg = 'Cannot detect an express application. Check Koii is within an express application';
    throw new Error(msg);
  } else if (!app._router || !Array.isArray(app._router.stack)) { // eslint-disable-line
    const message = 'Cannot detect routes in the express application.';
    throw new Error(message);
  }

  return true;
};

/**
 * style text with given color.
 *
 * @param {String} text     text to log
 * @param {String} color    color to use to log text
 * @returns {String}        decorated text with color
 * @api private
 */
const style = (text, color) => chalk[color](text);
exports.style = style;

/**
 * format and style application routes.
 *
 * @param {Array} routes    array of routes
 * @returns {String} styled
 * @api private
 */
exports.formatRoutes = routes => { // eslint-disable-line
  return Table.print(routes, ({ method, path }, cell) => {
    for (const [attr, color, title] of [[method, 'green', 'METHOD'], [path, 'white', 'PATH']]) {
      cell(style(title, 'cyan'), style(attr, color)); // eslint-disable-line
    }
  });
};

/**
 * log.
 *
 * @api private
 */
exports.log = console.log; // eslint-disable-line no-console
