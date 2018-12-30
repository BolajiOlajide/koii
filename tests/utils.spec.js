const Utils = require('../lib/utils');
const fixtures = require('./fixture');

describe('Utils', function () {
  describe('ValidateApplication', function () {
    it('application validation', function (done) {
      const t = function () {
        Utils.validateApplication('');
      };
      const messageOne = 'Cannot detect an express application. ';
      const messageTwo = 'Ensure you\'re making use of Koii within an express application';
      const message = messageOne + messageTwo;
      expect(t).toThrow(message);
      done();
    });

    it('application validation - 2', function (done) {
      const app = {};
      const t = function () {
        Utils.validateApplication(app);
      };

      const message = 'Cannot detect routes in the express application.';
      expect(t).toThrow(message);
      done();
    });

    it('application validation - 3', function (done) {
      const app = { _router: { stack: '' } };
      const t = function () {
        Utils.validateApplication(app);
      };

      const message = 'Cannot detect routes in the express application.';
      expect(t).toThrow(message);
      done();
    });

    it('application validation - 4', function (done) {
      const app = { _router: { stack: [] } };
      const t = Utils.validateApplication(app);

      expect(t).toBeTruthy();
      done();
    });
  });

  describe('Format Routes', function () {
    it('formats the routes', function () {
      const routes = [
        { method: 'get', path: '/' },
        { method: 'post', path: '/admin' }
      ];
      const s = Utils.formatRoutes(routes);
      const strLength = s.split(/\r\n|\r|\n/).length;
      expect(strLength).toBe(5);
    });
  });

  describe('Get Unique Routes', function () {
    it('gets unique route', function () {
      const routes = Utils.getUniqueRoutes(fixtures.routes);
      expect(routes.length).toBe(4);
    });
  });
});
