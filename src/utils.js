const Table = require('easy-table');
const chalk = require('chalk');


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

  routerStack.forEach((stacks = null) => {
    if (stacks.route) {
      const { stack, path } = stacks.route;

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

    /**
     *  checking to see if the word api exists, if so,
     *  it is being removed separetely from the string and 
     *  also the v1 or v2 is being removed separately.
     *  Everything is then concatenated into the 'fullUrlPath'
     *  variable.
     */    

    if (stacks.name === 'router') {
      const { handle } = stacks;

      const strigifiedRegex = stacks
        .regexp
        .toString();      

      const baseurl = strigifiedRegex.search(/api/);

      let version = null;
      let filteredBaseUrl = null;
      let fullUrlPath = null;
      let filteredVersion = null;

      if (baseurl > -1) {
        version = strigifiedRegex.match('api');
        filteredBaseUrl = version[0];

        filteredVersion = strigifiedRegex
          .replace(/[fast_car:false\\?i=|$)()/^trupe]/ig, '');

        fullUrlPath = `/${filteredBaseUrl}/${filteredVersion}`;
      } else {
        fullUrlPath = strigifiedRegex
          .replace(/[fast_car:false\\?i=|$)()/^trpue]/ig, '');
      }

      handle.stack.forEach(({ route }) => {
        route.stack.forEach(({ method }) => {
          const { path } = route;
          const httpMethod = method.toUpperCase();
          const fullPath = `${fullUrlPath}${path}`;

          routes.push({ method: httpMethod, path: fullPath });
        });
      });
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
