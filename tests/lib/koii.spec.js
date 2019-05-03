const koii = require('../../src');

describe('KOII', () => {
  it('displays routes', () => {
    expect(koii._events.mount.length).toBe(2); // eslint-disable-line
  });
});
