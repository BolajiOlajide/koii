import express, { Application } from 'express';

import {
  validate,
  log,
  style,
  getRoutes,
  formatRoutes,
} from './utils';
import { COLORS } from './constants';

const koii = express();

/**
 * method for displaying routes in an express application
 *
 * @param   {express.Application}   parent instance of the parent app
 * @returns {null}                  log details containing app routes
 */
const displayRoutes = (parent: Application) => {
  validate(parent);

  const { settings, _router: router } = parent;
  const routes = getRoutes(router.stack);
  const formattedRoutes = formatRoutes(routes);

  log((style(`NODE_ENV= ${settings.env}`, COLORS.CYAN)));
  log(formattedRoutes);
};

koii.on('mount', displayRoutes);

export default koii;
