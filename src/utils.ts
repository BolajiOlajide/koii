import { Application } from 'express';
import Table from 'easy-table';
import chalk from 'chalk';

import { ALL_METHODS, COLORS } from './constants';

const strigifiedRegex = (regex: RegExp) => regex
  .toString()
  .replace(/fast_star: false, fast_slash: true/, '')
  .replace(/[?(?=/|$)/^]/ig, '')
  .replace(/\\\\i/, '')
  .replace(/\\/g, '/');

// const strigifiedRegex2 = regex => regex
//   .toString()
//   .replace(/fast_star: false, fast_slash: true/, '')
//   .replace(/[?(?=\/|$)/^]/ig, '')
//   .replace(/\\\\i/, '')
//   .replace(/\\/g, '/')
//   .replace(/\\\\i/, '');

/**
 * validate parent application instance
 *
 * @param {Object}      app    express application
 * @returns {Boolean}          boolean to show if app is a valid express app
 * @exception {Object}
 * @api private
 */
export const validate = (app: Application): void => {
  if (!app) {
    const msg = 'Cannot detect an express application. Check Koii is within an express application';
    throw new Error(msg);
  }

  // eslint-disable-next-line no-underscore-dangle
  if (!app._router || !Array.isArray(app._router.stack)) {
    const message = 'Cannot detect routes in the express application.';
    throw new Error(message);
  }
};

/**
 * style text with given color.
 *
 * @param {String} text     text to log
 * @param {String} color    color to use to log text
 * @returns {String}        decorated text with color
 * @api private
 */
export const style = (text: string, color: COLORS): string => chalk[color](text);

/**
 * log.
 *
 * @api private
 */
export const { log } = console;

const parseRouteSet = (routes: Set<string>): string[] => Array
  .from<string>(routes)
  .map((route) => JSON.parse(route));

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
export const getRoutes = (router: Array<any>): string[] => {
  const routes: Set<string> = new Set();

  router.forEach((stacks = null) => {
    if (stacks.route) {
      const { stack, path } = stacks.route;

      stack.forEach(({ method = null }) => {
        if (method) {
          const httpMethod = (method as string).toUpperCase();

          routes.add(JSON.stringify({
            method: httpMethod,
            path,
          }));
        }
      });
    }

    if (stacks.name === 'router') {
      const { handle, regexp } = stacks;

      const baseRoute = strigifiedRegex(regexp);

      handle.stack.forEach((stack: any) => {
        if (stack.route) {
          stack.route.stack.forEach((innerStack: any) => {
            const { method } = innerStack;
            const { path } = stack.route;
            const fullPath = `${baseRoute}${path}`;

            const methods = method ? [method] : ALL_METHODS;

            methods.forEach((innerMethod: string) => {
              const httpMethod = innerMethod.toUpperCase();
              routes.add(JSON.stringify({ method: httpMethod, path: fullPath }));
            });
          });
        } else {
          const innerBaseRoute = strigifiedRegex(stack.regexp);
          const innerBasePath = `${baseRoute}${innerBaseRoute}`;

          stack.handle.stack.forEach((innerStack: any) => {
            if (innerStack.route) {
              const { path } = innerStack.route;

              // 😂 - innerInnerStack
              innerStack.route.stack.forEach((innerInnerStack: any) => {
                const fullPath = `${innerBasePath}${path}`;
                const httpMethod = innerInnerStack.method.toUpperCase();

                routes.add(JSON.stringify({ method: httpMethod, path: fullPath }));
              });
            }
          });
        }
      });
    }
  });

  return parseRouteSet(routes);
};

/**
 * format and style application routes.
 *
 * @param {Array} routes    array of routes
 * @returns {String} styled
 * @api private
 */
export const formatRoutes = (routes: any) => { // eslint-disable-line
  return Table.print(routes, ({ method, path }, cell) => {
    [[method, COLORS.GREEN, 'METHOD'], [path, 'white', 'PATH']].forEach(([attr, color, title]) => {
      cell(style(title, COLORS.CYAN), style(attr, color));
    });
  });
};
