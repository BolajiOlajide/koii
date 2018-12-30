const koii = require('../lib');

describe('KOII', function () {
  it('displays routes', function () {
    expect(koii._events.mount.length).toBe(2); // eslint-disable-line
  });
});
