const { validate, formatRoutes, getRoutes, style } = require('../../src/utils');
const fixtures = require('../mock/fixture');

describe('Utils', () => {
  describe('.validate', () => {
    it('throw error if app instance is string', (done) => {
      const msg = 'Cannot detect an express application. Check Koii is within an express application'; // eslint-disable-line

      expect(() => {
        validate('');
      }).toThrow(msg);
      done();
    });

    it('throw error if app instance is empty', (done) => {
      const message = 'Cannot detect routes in the express application.';
      const app = {};

      expect(() => {
        validate(app);
      }).toThrow(message);
      done();
    });

    it('throw error if app instance has router stack as string', (done) => {
      const message = 'Cannot detect routes in the express application.';
      const app = {
        _router: {
          stack: ''
        }
      };

      expect(() => {
        validate(app);
      }).toThrow(message);
      done();
    });

    it('return true if app instance has array router stack', (done) => {
      const app = {
        _router: {
          stack: []
        }
      };

      expect(validate(app)).toBeTruthy();
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
      expect(style('method', 'green')).toMatch(/method/);
    });
  });

  describe('.getRoutes', () => {
    it('return application routes', (done) => {
      const routes = getRoutes(fixtures.routes);
      const _routes = routes.reduce((routes, route) => { // eslint-disable-line
        routes[route.method] = route;
        return routes;
      }, {});

      expect(routes).toHaveLength(4);
      for (const { route } of fixtures.routes) {
        if (route) {
          const { stack, path } = route;
          const [{ method }] = stack;
          const actual = _routes[method.toUpperCase()];

          expect(actual.path).toEqual(path);
          expect(actual.method).toEqual(method.toUpperCase());
          done();
        }
      }
    });
  });
});
