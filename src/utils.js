const Table = require('easy-table');
const chalk = require('chalk');



const strigifiedRegex = regex => regex
  .toString()
  .replace(/fast_star: false, fast_slash: true/, '')
  .replace(/[?(?=\/|$)/^]/ig, '')
  .replace(/\\\\i/, '')
  .replace(/\\/g, '/');

const strigifiedRegex2 = regex => regex
  .toString()
  .replace(/fast_star: false, fast_slash: true/, '')
  .replace(/[?(?=\/|$)/^]/ig, '')
  .replace(/\\\\i/, '')
  .replace(/\\/g, '/')
  .replace(/\\\\i/, '');

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

    if (stacks.name === 'router') {
      const { handle, regexp } = stacks;

      const baseRoute = strigifiedRegex(regexp);

      handle.stack.forEach((stack) => {
        if (stack.route) {
          stack.route.stack.forEach(({ method }) => {
            const { path } = stack.route;
            const httpMethod = method.toUpperCase();
            const fullPath = `${baseRoute}${path}`;

            routes.push({ method: httpMethod, path: fullPath });
          });
        } else {
          const innerBaseRoute = strigifiedRegex(stack.regexp);
          const innerBasePath = `${baseRoute}${innerBaseRoute}`;

          stack.handle.stack.forEach((innerStack) => {
            const { path } = innerStack.route;

            // 😂 - innerInnerStack
            innerStack.route.stack.forEach((innerInnerStack) => {
              const fullPath = `${innerBasePath}${path}`;
              const httpMethod = innerInnerStack.method.toUpperCase();

              routes.push({ method: httpMethod, path: fullPath });
            })
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
