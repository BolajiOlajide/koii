import { Application } from 'express';

import { COLORS } from '../src/constants';
import { validate, formatRoutes, getRoutes, style } from '../src/utils';

import type { ApplicationRoute } from '../src/utils';

const mockRoutes = [
  {},
  { route: { stack: [{ method: 'get' }], path: '/' } },
  { route: { stack: [{ method: 'post' }], path: '/' } },
  { route: { stack: [{ method: 'patch' }], path: '/admin' } },
  { route: { stack: [{ method: 'delete' }], path: '/users' } },
  { route: { stack: [{ method: 'put' }], path: '/users/:id' } },
  { route: { stack: [{ method: 'head' }], path: '/users/:id' } },
  { something: { } },
];

type TemporaryRoutes = Record<string, ApplicationRoute>;

describe('Utils', () => {
  describe('.validate', () => {
    it('throw error if app instance has router stack as string', (done) => {
      const message = 'Cannot detect routes in the express application.';
      const app = {
        _router: {
          stack: ''
        }
      };

      expect(() => {
        validate(app as unknown as Application);
      }).toThrow(message);
      done();
    });

    it('does not throw an error if app instance has array router stack', (done) => {
      const app = {
        _router: {
          stack: []
        }
      };

      expect(validate(app as unknown as Application)).toBeUndefined();
      done();
    });
  });

  describe('.formatRoutes', () => {
    it('return formatted routes string', () => {
      const routes = [
        { method: 'get', path: '/' },
        { method: 'post', path: '/admin' }
      ];
      const result = formatRoutes(routes).split(/\r\n|\r|\n/);
      expect(result).toHaveLength(5);
    });
  });

  describe('.style', () => {
    it('return styled text', () => {
      expect(style('method', COLORS.GREEN)).toMatch(/method/);
    });
  });

  describe('.getRoutes', () => {
    it('return application routes', (done) => {
      const transformedRoutes = getRoutes(mockRoutes);
      let tempRoutes: TemporaryRoutes = {};
      const _routes: TemporaryRoutes = transformedRoutes.reduce((routes, route) => {
        routes[route.method] = route;
        return routes;
      }, tempRoutes);

      expect(transformedRoutes).toHaveLength(6);

      for (const { route } of mockRoutes) {
        if (route) {
          const { stack, path } = route;
          const [{ method }] = stack;
          const actual = _routes[method.toUpperCase()];

          expect(actual.path).toEqual(path);
          expect(actual.method).toEqual(method.toUpperCase());
        }
      }

      done();
    });
  });
});
