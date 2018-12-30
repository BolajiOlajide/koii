const fixtures = {};

fixtures.routes = [
  {},
  { route: { stack: [{ method: 'get' }], path: '/' } },
  { route: { stack: [{ method: 'post' }], path: '/' } },
  { route: { stack: [{ method: 'patch' }], path: '/admin' } },
  { route: { stack: [{ method: 'delete' }], path: '/users' } },
  { something: { } },
];

module.exports = fixtures;
